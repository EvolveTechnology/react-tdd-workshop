# Buy me a coffee

> This project is part of a React TDD workshop. The back end service is build entirely as a mock, although it could very well be deployed to production.

## Introduction

You hired a freelancer to help you setup a `Buy me a coffee` website. Your expectation is that visitors could create a user, and contribute to your Open Source efforts, by buying you coffee.

Visitors should also be able to see contributions made by others. Unless these are private.

As admin of the site you can also mark the contributions as `seen`, letting know visitors you've read their message.

The freelancer is now claiming to be done with her work, and has given you these queries and mutations:

```
query allContribs {
  allContributions {
    id
    qty
    message
    private
    seen
    user {
      name
    }
  }
}

query publicContribs {
  publicContributions{
  	id
   	user {
      name
    }
    message
    createdAt
  }
}

query myContribs {
  myContributions{
  	id
    user {
      name
    }
    message
    createdAt
    private
  }
}

query identity {
  whoAmI{
  	id
	  name
    email
    permissions
  }
}

query coffeePrice {
  coffeePrice{
    currency
    unitPrice
  }
}

mutation createUser{
  	signUp(email:"example@email.com", password:"password", name:"Username"){
    id
    name
	  permissions
  }
}

mutation signIn{
  signIn(email:"example@email.com", password:"password"){
    id
    name
	  permissions
  }
}

mutation adminSignIn {
  signIn(email:"your@admin.com", password:"admin_password"){
  	id
    name
    permissions
  }
}

mutation signOut{
  signOut {
    message
  }
}

mutation createPrivateContrib {
  createContribution(private:true, qty:2, message:"Private Contribution", token:"token"){
	  seen
    qty
    id
  }
}

mutation createPublicContrib {
  createContribution(qty:10, message:"Public Contribution", token:"token"){
  	seen
    qty
    id
  }
}

mutation markAsSeen {
  updateSeen(id: "ck7h9aat4r7j70950v5y0dri6"){
    id
    qty
    seen
  }
}

mutation requestReset {
  requestReset(email: "example@email.com") {
    message
  }
}

mutation resetPassword {
  resetPassword(
    resetToken: "randomResetToken"
    password: "newPassword"
    confirmPassword: "newPassword"
  ) {
    name
    email
  }
}

```

Using only these, and following the TDD paradigm, finish building your `Buy me a coffee` app.

## Specification

- There should be a landing page, which displays all public contributions, from most recent to oldest.
- There should be a button to start a contribution
- If the user is not logged in, offer Sign Up or Sign In options.
- If the user is already logged in, show the Stripe payment option.
- Give users the option to make contributions private.
- Give users the option to attach a message to the contribution.

- Allow users to see their previous contributions, and their `seen` status.

- As an admin, you should have access to a special route, from which you can mark contributions as seen.

- Should a user forget their password, they should be able to request a reset.

- If the reset is successful the backend will give them a route to follow, implement that route.
  - The route looks like this: https://localhost:3000/reset?resetToken="kslskslds"

## Credit

The icons used in the front end project come from [icons8](https://icons8.com/). Check them out!
