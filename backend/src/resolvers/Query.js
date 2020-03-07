const Query = {
  async getAllContributions(parent, args, ctx, info) {
    const contributions = await ctx.db.query.contributions();
    return contributions;
  }
};

module.exports = Query;
