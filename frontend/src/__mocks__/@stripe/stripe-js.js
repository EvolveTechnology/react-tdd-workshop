import * as stripeLib from "@stripe/stripe-js";

stripeLib.loadStripe = () => ({ createPaymentMethod: () => {} });

module.exports = stripeLib;
