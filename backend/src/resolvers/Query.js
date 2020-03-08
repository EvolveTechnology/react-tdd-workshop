const Query = {
  async getAllContributions(parent, args, ctx, info) {
    const contributions = await ctx.db.query.contributions();
    return contributions;
  },
  async getContribution(parent, args, ctx, info) {
    const contribution = await ctx.db.query.contribution(args, info);
    return contribution;
  },
  whoAmI(parent, args, ctx, info) {
    if (!ctx.request.userId) {
      return null;
    }
    return ctx.db.query.user({ where: { id: ctx.request.userId } }, info);
  }
};

module.exports = Query;
