const Query = {
  async allContributions(parent, args, ctx, info) {
    const { userId } = ctx.request;
    if (!userId) {
      throw new Error("Log in as Admin to see all");
    }

    const { permissions } = await ctx.db.query.user(
      { where: { id: userId } },
      `{ permissions }`
    );
    const isAdmin = permissions.includes("ADMIN");

    if (!isAdmin) {
      throw new Error("Log in as Admin to see all");
    }

    return ctx.db.query.contributions({}, info);
  },
  publicContributions(parent, args, ctx, info) {
    return ctx.db.query.contributions(
      { where: { private: false } },
      `{
    id
    qty
		message
		createdAt
		updatedAt
		seen
		user { name }
	}`
    );
  },
  async myContributions(parent, args, ctx, info) {
    const { userId } = ctx.request;

    if (!userId) {
      throw new Error("Must be logged in to get your contributions");
    }

    return ctx.db.query.contributions(
      {
        where: {
          user: {
            id: userId
          }
        }
      },
      `{ 
		id
		createdAt 
		updatedAt
		qty 
		message
		seen
		private
		user { id name } 
	}`
    );
  },
  whoAmI(parent, args, ctx, info) {
    if (!ctx.request.userId) {
      return null;
    }
    return ctx.db.query.user({ where: { id: ctx.request.userId } }, info);
  },
  coffeePrice(parent, args, ctx, info) {
    const unitPrice = process.env.COFFEE_PRICE || 0;
    const currency = process.env.CURRENCY;
    return { unitPrice, currency };
  }
};

module.exports = Query;
