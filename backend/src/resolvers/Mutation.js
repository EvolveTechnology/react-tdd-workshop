const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Mutation = {
  async createContribution(parent, args, ctx, info) {
    const contribution = await ctx.db.mutation.createContribution(
      {
        data: { ...args }
      },
      info
    );

    return contribution;
  },
  async contributeMore(parent, args, ctx, info) {
    const { id, qty } = args;
    const contribution = await ctx.db.query.contribution({
      where: { id }
    });

    return ctx.db.mutation.updateContribution({
      data: { qty: contribution.qty + qty },
      where: { id }
    });
  },
  async updateSeen(parent, args, ctx, info) {
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
      info
    );

    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);

    // setup a cookie for one year
    ctx.response.cookie("token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365
    });

    return user;
  }
};

module.exports = Mutation;
