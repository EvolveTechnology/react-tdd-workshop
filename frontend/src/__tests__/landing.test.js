import React from "react";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { MockedProvider } from "@apollo/react-testing";

import { act } from "react-dom/test-utils";

import { render, fireEvent, wait } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import Landing from "containers/Landing";
import { AuthProvider } from "providers/Auth";
import { IDENTITY, PUBLIC_CONTRIBUTIONS } from "graphql/queries";

test("Donate click when identity is unknown", async () => {
  let queries;

  const stripePromise = loadStripe("key");

  await act(async () => {
    queries = await render(
      <Router history={createMemoryHistory({ initialEntries: ["/"] })}>
        <MockedProvider
          mocks={[
            {
              request: {
                query: PUBLIC_CONTRIBUTIONS
              },
              result: {
                data: {
                  publicContributions: [
                    {
                      updatedAt: "2020-03-12T17:10:55.553Z",
                      seen: false,
                      id: "ck7m16q36uui90950k17msxoz",
                      qty: 10,
                      createdAt: "2020-03-10T15:10:07.506Z",
                      message: "nice message",
                      user: {
                        name: "test subject"
                      }
                    },
                    {
                      updatedAt: "2020-03-12T17:11:02.093Z",
                      seen: false,
                      id: "ck7m1iu1rerf80986odx6mjon",
                      qty: 100,
                      createdAt: "2020-03-10T15:19:32.511Z",
                      message: "hi again",
                      user: {
                        name: "test subject"
                      }
                    }
                  ]
                }
              }
            },
            { request: { query: IDENTITY }, result: { data: { whoAmI: null } } }
          ]}
          addTypename={false}
        >
          <AuthProvider>
            <Elements stripe={stripePromise}>
              <Landing />
            </Elements>
          </AuthProvider>
        </MockedProvider>
      </Router>
    );
  });

  let donateBtn;
  let dialog;

  await wait(() => {
    donateBtn = queries.getByTestId("donate-button");
    expect(donateBtn).toBeInTheDocument();
  });

  await act(async () => {
    fireEvent.click(donateBtn);
  });

  await wait(() => {
    dialog = queries.getByTestId("donate-dialog");
    expect(dialog).toBeInTheDocument();

    expect(queries.getByTestId("login-form")).toBeInTheDocument();
  });

  await act(async () => {
    fireEvent.keyDown(dialog, {
      key: "Escape",
      code: 27,
      charCode: 27
    });
  });

  // on closing
  await wait(() => {
    expect(queries.queryByTestId("login-form")).toBe(null);
  });

  await wait(() => {
    expect(queries.getAllByTestId("contribution-card")).toHaveLength(2);
  });
});

test("Donate click when already logged in", async () => {
  let queries;

  const stripePromise = loadStripe("key");

  await act(async () => {
    queries = await render(
      <Router history={createMemoryHistory()}>
        <MockedProvider
          mocks={[
            {
              request: {
                query: PUBLIC_CONTRIBUTIONS
              },
              result: {
                data: {
                  publicContributions: [
                    {
                      updatedAt: "2020-03-12T17:10:55.553Z",
                      seen: false,
                      id: "ck7m16q36uui90950k17msxoz",
                      qty: 10,
                      createdAt: "2020-03-10T15:10:07.506Z",
                      message: "nice message",
                      user: {
                        name: "test subject"
                      }
                    },
                    {
                      updatedAt: "2020-03-12T17:11:02.093Z",
                      seen: false,
                      id: "ck7m1iu1rerf80986odx6mjon",
                      qty: 100,
                      createdAt: "2020-03-10T15:19:32.511Z",
                      message: "hi again",
                      user: {
                        name: "test subject"
                      }
                    }
                  ]
                }
              }
            },
            {
              request: { query: IDENTITY },
              result: {
                data: {
                  whoAmI: {
                    id: "hshs",
                    name: "jsos",
                    email: "sss",
                    permissions: ["USER"]
                  }
                }
              }
            }
          ]}
          addTypename={false}
        >
          <AuthProvider>
            <Elements stripe={stripePromise}>
              <Landing />
            </Elements>
          </AuthProvider>
        </MockedProvider>
      </Router>
    );
  });

  let donateBtn;
  let dialog;
  let cancelBtn;

  await wait(() => {
    donateBtn = queries.getByTestId("donate-button");
    expect(donateBtn).toBeInTheDocument();
  });

  act(() => {
    fireEvent.click(donateBtn);
  });

  await wait(() => {
    dialog = queries.getByTestId("donate-dialog");
    expect(dialog).toBeInTheDocument();
  });

  await wait(() => {
    cancelBtn = queries.getByTestId("cancel-checkout");
    expect(queries.getByTestId("contribute-form")).toBeInTheDocument();
  });

  act(() => {
    fireEvent.click(cancelBtn);
  });

  // on closing
  await wait(() => {
    expect(queries.queryByTestId("contribute-form")).toBe(null);
  });

  await wait(() => {
    expect(queries.getAllByTestId("contribution-card")).toHaveLength(2);
  });
});
