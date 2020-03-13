import * as stripeLib from "@stripe/stripe-js";

stripeLib.loadStripe = (...args) =>
  Promise.resolve(null).then(maybeStripe =>
    maybeStripe ? maybeStripe(...args) : null
  );

module.exports = stripeLib;
