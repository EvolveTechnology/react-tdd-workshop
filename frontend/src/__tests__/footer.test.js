import React from "react";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import App from "App";

import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

beforeAll(() => {
  jest.mock("@stripe/stripe-js", () => ({
    loadStripe: () => ({ createPaymentMethod: () => {} })
  }));
});

describe("Credit icon providers", () => {
  const stripePromise = loadStripe();
  const { getByText } = render(
    <Elements stripe={stripePromise}>
      <App />
    </Elements>
  );
  const element = getByText(/icons8/i);

  it("Mentions the icon providers", () => {
    expect(element).toBeInTheDocument();
  });

  it("Links to the icon providers", () => {
    expect(element.getAttribute("href")).toMatch("icons8.com");
  });
});
