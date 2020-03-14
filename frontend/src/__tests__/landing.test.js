import React from "react";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import Landing from "containers/Landing";
import { act } from "react-dom/test-utils";

import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

// But the better solution is to write fewer, longer tests: https://kentcdodds.com/blog/write-fewer-longer-tests

describe("Donate click", () => {
  let queries;

  beforeAll(async () => {
    const stripePromise = loadStripe("key");
    await act(async () => {
      queries = await render(
        <Elements stripe={stripePromise}>
          <Landing />
        </Elements>
      );
    });
  });

  it("Opens Dialog with login/checkout, which can be cancelled", async () => {
    const donateBtn = queries.getByTestId("donate-button");

    expect(donateBtn).toBeInTheDocument();

    fireEvent.click(donateBtn);

    const dialog = queries.getByTestId("donate-dialog");

    expect(dialog).toBeInTheDocument();

    const login = queries.getByTestId("login-form");
    const contribute = queries.getByTestId("contribute-form");

    expect(login).toBeInTheDocument();
    expect(contribute).toBeInTheDocument();

    const cancelBtn = queries.getByTestId("cancel-checkout");

    fireEvent.click(cancelBtn);

    // on closing
    expect(login).not.toBeInTheDocument();
    expect(contribute).not.toBeInTheDocument();
  });
});
