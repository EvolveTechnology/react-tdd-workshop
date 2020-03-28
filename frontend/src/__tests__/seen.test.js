import React from "react";
import { App } from "routes";
import { act } from "react-dom/test-utils";

import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { MockedProvider } from "@apollo/react-testing";

import { render, fireEvent, wait } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import { MARK_AS_SEEN } from "graphql/mutations";

import { IDENTITY, ALL_CONTRIBUTIONS } from "graphql/queries";

const mocks = [
  {
    request: {
      query: IDENTITY
    },
    result: {
      data: {
        whoAmI: {
          id: "userId",
          name: "name",
          email: "example@email.com",
          permissions: ["ADMIN"]
        }
      }
    }
  },
  {
    request: {
      query: ALL_CONTRIBUTIONS
    },
    result: {
      data: {
        allContributions: [
          {
            updatedAt: "2020-03-12T17:10:55.553Z",
            seen: false,
            id: "contributionId0",
            qty: 10,
            private: false,
            createdAt: "2020-03-10T15:10:07.506Z",
            message: "nice message",
            user: {
              name: "test subject"
            }
          },
          {
            updatedAt: "2020-05-12T17:10:55.553Z",
            seen: false,
            id: "contributionId1",
            qty: 1,
            private: false,
            createdAt: "2020-04-10T15:10:07.506Z",
            message: "not so nice message",
            user: {
              name: "subject"
            }
          }
        ]
      }
    }
  },
  {
    request: {
      query: MARK_AS_SEEN,
      variables: {
        id: "contributionId0"
      }
    },
    result: {
      data: {
        updateSeen: {
          id: "contributionId0",
          qty: 1,
          seen: true
        }
      }
    }
  },
  {
    request: {
      query: ALL_CONTRIBUTIONS
    },
    result: {
      data: {
        allContributions: [
          {
            updatedAt: "2020-03-12T17:10:55.553Z",
            seen: true,
            id: "contributionId0",
            qty: 10,
            private: false,
            createdAt: "2020-03-10T15:10:07.506Z",
            message: "nice message",
            user: {
              name: "test subject"
            }
          },
          {
            updatedAt: "2020-05-12T17:10:55.553Z",
            seen: false,
            id: "contributionId1",
            qty: 1,
            private: false,
            createdAt: "2020-04-10T15:10:07.506Z",
            message: "not so nice message",
            user: {
              name: "subject"
            }
          }
        ]
      }
    }
  }
];

test("Admin can mark a contribution as seen", async () => {
  let queries;
  let container;

  await act(async () => {
    queries = await render(
      <Router history={createMemoryHistory({ initialEntries: ["/admin"] })}>
        <MockedProvider mocks={mocks} addTypename={false}>
          <App />
        </MockedProvider>
      </Router>
    );
    container = queries.container;
  });

  // expect admin view to load
  await wait(() => {
    expect(queries.getByTestId("admin-view")).toBeInTheDocument();
  });

  // find the nice message
  await wait(() => {
    expect(queries.getByText("nice message")).toBeInTheDocument();
    // and no seen messages
    expect(container.querySelectorAll('[aria-label="yes"]')).toHaveLength(0);
    expect(container.querySelectorAll('[aria-label="no"]')).toHaveLength(2);
  });

  // Mark as seen
  act(() => {
    fireEvent.click(queries.getByText("nice message"));
  });

  // expect there to be a seen contributions
  await wait(() => {
    expect(container.querySelectorAll('[aria-label="yes"]')).toHaveLength(1);
    expect(container.querySelectorAll('[aria-label="no"]')).toHaveLength(1);
  });
});
