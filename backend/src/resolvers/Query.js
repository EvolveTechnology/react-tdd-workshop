const Query = {
  async getAllContributions(parent, args, ctx, info) {
    const contributions = await ctx.db.query.contributions();
    return contributions;
  },
  async getContribution(parent, args, ctx, info) {
    const contribution = await ctx.db.query.contribution(args);
    return contribution;
  }
};

module.exports = Query;
