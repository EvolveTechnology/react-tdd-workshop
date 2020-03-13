import React from "react";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import App from "App";

import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

describe("Credit icon providers", () => {
  const stripePromise = loadStripe("key");

  const { getByText } = render(
    <Elements stripe={stripePromise}>
      <App />
    </Elements>
  );
  const credits = getByText(/icons8/i);

  it("Mentions the icon providers", () => {
    expect(credits).toBeInTheDocument();
  });

  it("Links to the icon providers", () => {
    expect(credits.getAttribute("href")).toMatch("icons8.com");
  });
});
