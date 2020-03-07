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
  }
};

module.exports = Mutation;
