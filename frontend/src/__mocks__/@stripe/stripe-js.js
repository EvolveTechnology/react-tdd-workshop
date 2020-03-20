import * as stripeLib from "@stripe/stripe-js";

const noop = () => {};
const defaultElements = () => ({
  create: () => ({ mount: noop, on: noop, destroy: noop }),
  getElement: noop
});

const createTokenMock = () =>
  new Promise(resolve => {
    return resolve({ token: { id: "stripe_token" }, error: null });
  });

stripeLib.loadStripe = (...args) =>
  Promise.resolve((...values) => {
    const [
      elements,
      createToken,
      createPaymentMethod,
      confirmCardPayment
    ] = values.slice(1);
    return {
      elements: elements || defaultElements,
      createToken: createToken || createTokenMock,
      createPaymentMethod: createPaymentMethod || noop,
      confirmCardPayment: confirmCardPayment || noop
    };
  }).then(maybeStripe => (maybeStripe ? maybeStripe(...args) : null));

module.exports = stripeLib;
