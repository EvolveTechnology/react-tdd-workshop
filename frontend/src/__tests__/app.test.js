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

  let queries;

  let credits;

  beforeEach(async () => {
    await act(async () => {
      queries = await render(
        <Elements stripe={stripePromise}>
          <App />
        </Elements>
      );
    });
  });

  it("Mentions the icon providers", async () => {
    // async blocks can only be in `it` blocks or `test` blocks
    credits = queries.getByText(/icons8/i);
    expect(credits).toBeInTheDocument();
  });

  it("Links to the icon providers", () => {
    expect(credits.getAttribute("href")).toMatch("icons8.com");
  });

  it("Calls stripe elements", () => {
    expect(mockCreateElement).toHaveBeenCalled();
  });

  it("Has a donate button", () => {
    const donateButton = queries.getByTestId("donate-button");
    expect(donateButton).toBeInTheDocument();
  });

  it("Has a navigation bar", () => {
    const navbar = queries.getByTestId("navbar");
    expect(navbar).toBeInTheDocument();
  });

  it("Has a contributors title", () => {
    const contributorsTitle = queries.getByTestId("contributors-title");
    expect(contributorsTitle).toBeInTheDocument();
  });
});

describe("Donate click", () => {
  it("Opens Dialog with login/checkout, which can be cancelled", () => {
    expect(true).toBe(false);
  });
});
