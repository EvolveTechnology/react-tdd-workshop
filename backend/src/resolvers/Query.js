const Query = {
  async getAllContributions(parent, args, ctx, info) {
    const contributions = await ctx.db.query.contributions();
    return contributions;
  },
  async getContribution(parent, args, ctx, info) {
    const contribution = await ctx.db.query.contribution(args, info);
    return contribution;
  },
  async getMyContributions(parent, args, ctx, info) {
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
  }
};

module.exports = Query;
