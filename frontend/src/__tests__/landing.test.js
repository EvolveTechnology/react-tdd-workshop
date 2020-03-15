import React from "react";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import { ApolloProvider } from "@apollo/react-hooks";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";

import { act } from "react-dom/test-utils";

import { render, fireEvent, cleanup, wait } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import Landing from "containers/Landing";
import apolloClient from "apolloClient";

// But the better solution is to write fewer, longer tests: https://kentcdodds.com/blog/write-fewer-longer-tests

describe("Donate click", () => {
  let queries;

  beforeAll(async () => {
    const stripePromise = loadStripe("key");
    await act(async () => {
      queries = await render(
        <ApolloProvider client={apolloClient}>
          <Router history={createMemoryHistory()}>
            <Elements stripe={stripePromise}>
              <Landing />
            </Elements>
          </Router>
        </ApolloProvider>
      );
    });
  });

  afterAll(cleanup);

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

    await wait(() => {
      expect(queries.getAllByTestId("contribution-card")).toHaveLength(2);
    });
  });
});
