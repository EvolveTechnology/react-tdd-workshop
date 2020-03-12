const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { promisify } = require("util");
const { randomBytes } = require("crypto");

const { transport, createTemplate } = require("../mail");
const stripe = require("../stripe");

const ONE_HOUR = 1000 * 60 * 60;
const ONE_YEAR = ONE_HOUR * 24 * 365;

const Mutation = {
  async createContribution(parent, args, ctx, info) {
    const { userId } = ctx.request;
    if (!userId) {
      throw new Error("Must be logged in to contribute");
    }

    const { token, qty, ...rest } = args;

    const currency = process.env.CURRENCY;
    const unitPrice = process.env.COFFEE_PRICE;
    const amount = qty * unitPrice;

    await stripe.charges
      .create({
        amount,
        currency,
        source: token
      })
      .catch(() => {
        throw new Error("Could not process the charge");
      });

    const contribution = await ctx.db.mutation.createContribution(
      {
        data: { ...rest, qty, unitPrice, user: { connect: { id: userId } } }
      },
      info
    );

    return contribution;
  },
  async updateSeen(parent, args, ctx, info) {
    const { userId } = ctx.request;

    if (!userId) {
      throw new Error("Must be logged in");
    }

    const { permissions } = await ctx.db.query.user(
      { where: { id: userId } },
      "{ permissions }"
    );

    const isAdmin = permissions.includes("ADMIN");

    if (!isAdmin) {
      throw new Error("Must be Admin to change seen status");
    }

    const { id } = args;
    const { seen, ...rest } = await ctx.db.query.contribution({
      where: { id }
    });

    if (seen) {
      return { ...rest, id, seen };
    }

    return ctx.db.mutation.updateContribution(
      {
        data: { seen: true },
        where: { id }
      },
      info
    );
  },
  async signUp(parent, args, ctx, info) {
    const password = await bcrypt.hash(args.password, 10);
    const user = await ctx.db.mutation.createUser(
      {
        data: {
          ...args,
          email: args.email.toLowerCase(),
          password,
          permissions: { set: ["USER"] }
        }
      },
      `{ id name email permissions }`
    );

    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);

    // setup a cookie for one year
    ctx.response.cookie("token", token, {
      httpOnly: true,
      maxAge: ONE_YEAR
    });

    return user;
  },
  async signIn(parent, args, ctx, info) {
    const { email, password } = args;
    const user = await ctx.db.query.user(
      { where: { email } },
      `{ id name permissions email password }`
    );

    if (!user) {
      throw new Error(`User not found, ${email}`);
    }

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      throw new Error("Invalid password");
    }

    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);

    ctx.response.cookie("token", token, {
      httpOnly: true,
      maxAge: ONE_YEAR
    });

    return user;
  },
  signOut(parent, args, ctx, info) {
    ctx.response.clearCookie("token");

    return { message: "Logged out" };
  },
  async requestReset(parent, args, ctx, info) {
    const user = await ctx.db.query.user({ where: { email: args.email } });

    if (!user) {
      throw new Error(`User not found, ${args.email}`);
    }

    const unHexedResetToken = await promisify(randomBytes)(20);
    const resetToken = unHexedResetToken.toString("hex");

    const resetTokenExpiry = Date.now() + ONE_HOUR;

    await ctx.db.mutation.updateUser({
      where: { email: args.email },
      data: { resetToken, resetTokenExpiry }
    });

    await transport
      .sendMail({
        from: process.env.MAIL_USER,
        to: user.email,
        subject: "Password Reset",
        html: createTemplate(`You requested a password reset!
		\n\n
		<a href="${process.env.FRONTEND_URL}/reset?resetToken=${resetToken}">Click here to reset.</a>
		`)
      })
      .catch(err => {
        console.log(err);
        throw new Error("Failed to send email");
      });

    return { message: "Done" };
  },
  async resetPassword(parent, args, ctx, info) {
    if (args.password !== args.confirmPassword) {
      throw new Error("Passwords do not match");
    }

    const [user] = await ctx.db.query.users({
      where: {
        resetToken: args.resetToken,
        resetTokenExpiry_gte: Date.now() - ONE_HOUR
      }
    });

    if (!user) {
      throw new Error("Token invalid or expired");
    }

    const password = await bcrypt.hash(args.password, 10);

    const updatedUser = await ctx.db.mutation.updateUser({
      where: { email: user.email },
      data: {
        password,
        resetToken: null,
        resetTokenExpiry: null
      }
    });

    const token = jwt.sign({ userId: updatedUser.id }, process.env.APP_SECRET);

    ctx.response.cookie("token", token, {
      httpOnly: true,
      maxAge: ONE_YEAR
    });

    return updatedUser;
  }
};

module.exports = Mutation;
