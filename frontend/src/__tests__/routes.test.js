import React from "react";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import Routes from "routes";

import { act } from "react-dom/test-utils";

import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

// But the better solution is to write fewer, longer tests: https://kentcdodds.com/blog/write-fewer-longer-tests

describe("External services", () => {
  const mockCreateElement = jest.fn();
  let queries;
  let credits;

  beforeAll(async () => {
    await act(async () => {
      const stripePromise = loadStripe("key", mockCreateElement);
      queries = await render(
        <Elements stripe={stripePromise}>
          <Routes />
        </Elements>
      );
    });
  });

  it("Mentions the icon providers and creates stripe element", async () => {
    // async blocks can only be in `it` blocks or `test` blocks
    credits = queries.getByText(/icons8/i);

    expect(credits).toBeInTheDocument();
    expect(credits.getAttribute("href")).toMatch("icons8.com");

    expect(mockCreateElement).toHaveBeenCalled();
  });
});

describe("Layout elements", () => {
  let queries;

  beforeAll(async () => {
    const stripePromise = loadStripe("key");
    await act(async () => {
      queries = await render(
        <Elements stripe={stripePromise}>
          <Routes />
        </Elements>
      );
    });
  });

  it("Has a donate button, navigation bar, and contributors title", () => {
    const donateButton = queries.getByTestId("donate-button");
    const navbar = queries.getByTestId("navbar");
    const contributorsTitle = queries.getByTestId("contributors-title");

    expect(donateButton).toBeInTheDocument();
    expect(navbar).toBeInTheDocument();
    expect(contributorsTitle).toBeInTheDocument();
  });
});

describe("Login Route", () => {
  // on landing page, clicking on Navbar login link, should load login form route
  expect(true).toBe(false);
});
