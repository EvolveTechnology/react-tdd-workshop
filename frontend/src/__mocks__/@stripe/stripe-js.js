import * as stripeLib from "@stripe/stripe-js";

const noop = () => {};

stripeLib.loadStripe = (...args) =>
  Promise.resolve((...values) => {
    const [
      elements,
      createToken,
      createPaymentMethod,
      confirmCardPayment
    ] = values.slice(1);
    return {
      elements: elements || noop,
      createToken: createToken || noop,
      createPaymentMethod: createPaymentMethod || noop,
      confirmCardPayment: confirmCardPayment || noop
    };
  }).then(maybeStripe => (maybeStripe ? maybeStripe(...args) : null));

module.exports = stripeLib;
