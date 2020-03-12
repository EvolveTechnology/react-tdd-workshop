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
7. Create and use a `variables.env` file to hold data for `prisma.yml`
	- PRISMA_ENDPOINT
	- PRISMA_SECRET
8. Use hooks in the `prisma.yml` file
	- `post-deploy`: `- graphql get-schema -p prisma` 
9. Make sure the `datamodel` option in `prisma.yml` is set to `datamodel.graphql`
	- Rename `datamodel.prisma` to `datamodel.graphql`
10. Install `npm i -g graphql-cli` or `yarn global add graphql-cli`
11. Create `.graphqlconfig.yml` 
	- Make sure the project name matches the deploy hook.
12. Deploy `prisma deploy --env-file variables.env`

## Prisma Bindings and Graphql Yoga

- Create db handler with Prisma Binding
- Create server with graphql-yoga
- Create resolver placeholders
- Spin up the server from `src/index.js`

## Mailtrap

Create a mailtrap account and fill in the `variables.env` file with mailtraps data:

```
MAIL_HOST="smtp.mailtrap.io"
MAIL_PORT=2525
MAIL_USER="Your User"
MAIL_PASS="Your Pass"
```

## Stripe

- Sign up for a Stripe account. By default, you'll be in test mode. Double check!
- Get a test public key and test secret key
- Add the secret key to your `variables.env`

The `variable.env` file should look something like this by now:

```
FRONTEND_URL="http://localhost:3000"
PRISMA_ENDPOINT="Your endpoint"
PRISMA_SECRET="Your secret"
APP_SECRET="Yet another secret"
PORT=8080
MAIL_HOST="smtp.mailtrap.io"
MAIL_PORT=2525
MAIL_USER="Your User"
MAIL_PASS="Your Pass"
COFFEE_PRICE=20
CURRENCY=SEK
STRIPE_SECRET="Your secret key"
```

## Running the back end

Using either `npm` or `yarn`, install dependencies. 

The project has a `yarn.lock` file, which will make it more predictable during the workshop. 

If `npm i` gives you problems, consider using `yarn` instead. 

