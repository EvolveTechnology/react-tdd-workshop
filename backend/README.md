# Back end

## Prisma Instructions


1. Go to [Prisma](https://www.prisma.io/)
2. Sign in with GitHub or make an account
3. Install `npm i -g prisma` or `yarn global add prisma`
4. Login with `prisma login`
5. Run `prisma init`:
	- Select `Demo Server`.
	- Choose a region. Prisma lists them by ascending latency.
	- Choose a name.
	- Name the stage.
	- Do not create a client.
6. Open a text editor and see the created files.
7. Use the `variables.env` file to hold data for `prisma.yml`
	- PRISMA_ENDPOINT
	- PRISMA_SECRET
8. Use hooks in the `prisma.yml` file
	- `post-deploy`: `- graphql get-schema -p prisma` 
9. Install `npm i -g graphql-cli` or `yarn global add graphql-cli`
10. Create `.graphqlconfig.yml` 
	- Make sure the project name matches the deploy hook.
11. Deploy `prisma deploy --env-file variables.env`
