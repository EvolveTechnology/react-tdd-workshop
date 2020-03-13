import React from "react";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import App from "App";
import { act } from "react-dom/test-utils";

import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

describe("Credit icon providers", () => {
  const mockCreateElement = jest.fn();

  const stripePromise = loadStripe("key", mockCreateElement);

  let getByText;
  let credits;

  it("Mentions the icon providers", async () => {
    // async blocks can only be in `it` blocks or `test` blocks
    await act(async () => {
      const queries = await render(
        <Elements stripe={stripePromise}>
          <App />
        </Elements>
      );

      getByText = queries.getByText;
    });

    credits = getByText(/icons8/i);
    expect(credits).toBeInTheDocument();
  });

  it("Links to the icon providers", () => {
    expect(credits.getAttribute("href")).toMatch("icons8.com");
  });

  it("Calls stripe elements", () => {
    expect(mockCreateElement).toHaveBeenCalled();
  });
});
