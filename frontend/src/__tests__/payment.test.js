import React from "react";
import { App } from "routes";
import { act } from "react-dom/test-utils";

import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { MockedProvider } from "@apollo/react-testing";

import { render, fireEvent, wait } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import { IDENTITY, PUBLIC_CONTRIBUTIONS } from "graphql/queries";
import { CREATE_CONTRIBUTION } from "graphql/mutations";

const token = "stripe_token";
const qty = 2;

const mockCreateContribution = jest.fn(() => ({
  data: {
    createContribution: {
      qty,
      id: "someId"
    }
  }
}));

const mocks = [
  {
    request: {
      query: IDENTITY
    },
    result: {
      data: {
        whoAmI: {
          id: "someId",
          name: "name",
          email: "example@email.com",
          permissions: ["USER"]
        }
      }
    }
  },
  {
    request: {
      query: PUBLIC_CONTRIBUTIONS
    },
    result: {
      data: {
        publicContributions: []
      }
    }
  },
  {
    request: {
      query: CREATE_CONTRIBUTION,
      variables: {
        qty,
        message: null,
        token,
        private: false
      }
    },
    result: mockCreateContribution
  },
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
            id: "someId",
            message: null,
            qty,
            createdAt: "2020-03-10T15:10:07.506Z",
            user: {
              name: "name"
            }
          }
        ]
      }
    }
  }
];

afterEach(() => mockCreateContribution.mockClear());

test(`A logged in user can checkout ${qty} cups of coffee`, async () => {
  let queries;

  await act(async () => {
    queries = await render(
      <Router history={createMemoryHistory({ initialEntries: ["/"] })}>
        <MockedProvider mocks={mocks} addTypename={false}>
          <App />
        </MockedProvider>
      </Router>
    );
  });

  let donateBtn;
  let dialog;
  let checkoutBtn;

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
  });

  await wait(() => {
    expect(queries.getByTestId("coffee-cups-slider")).toBeInTheDocument();
  });

  act(() => {
    fireEvent.change(queries.getByTestId("coffee-cups-slider"), {
      target: { value: qty }
    });
  });

  await wait(() => {
    checkoutBtn = queries.getByTestId("proceed-checkout");
    expect(checkoutBtn).toBeInTheDocument();
  });

  act(() => {
    fireEvent.click(checkoutBtn);
  });

  await wait(() => {
    expect(queries.queryByTestId("donate-dialog")).toBe(null);
  });

  await wait(() => {
    expect(queries.getAllByTestId("contribution-card")).toHaveLength(1);
  });

  await wait(() => {
    expect(mockCreateContribution).toHaveBeenCalledTimes(1);
  });
});

test(`A logged in user CANNOT checkout 0 cups of coffee`, async () => {
  let queries;

  await act(async () => {
    queries = await render(
      <Router history={createMemoryHistory({ initialEntries: ["/"] })}>
        <MockedProvider mocks={mocks} addTypename={false}>
          <App />
        </MockedProvider>
      </Router>
    );
  });

  let donateBtn;
  let dialog;
  let checkoutBtn;

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
  });

  await wait(() => {
    checkoutBtn = queries.getByTestId("proceed-checkout");
    expect(queries.getByTestId("coffee-cups-slider")).toBeInTheDocument();
    expect(checkoutBtn.getAttribute("disabled")).toBe(null);
  });

  act(() => {
    fireEvent.change(queries.getByTestId("coffee-cups-slider"), {
      target: { value: 0 }
    });
  });

  await wait(() => {
    checkoutBtn = queries.getByTestId("proceed-checkout");
    expect(checkoutBtn).toBeInTheDocument();
    expect(checkoutBtn.getAttribute("disabled")).not.toBe(null);
    expect(mockCreateContribution).toHaveBeenCalledTimes(0);
  });
});
