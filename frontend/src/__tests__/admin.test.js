import React from "react";
import { act } from "react-dom/test-utils";

import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { MockedProvider } from "@apollo/react-testing";

import { render, wait, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import { App } from "routes";
import {
  PUBLIC_CONTRIBUTIONS,
  MY_CONTRIBUTIONS,
  IDENTITY
} from "graphql/queries";

const unAuthMocks = [
  {
    request: {
      query: IDENTITY
    },
    result: {
      data: {
        whoAmI: null
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
      query: MY_CONTRIBUTIONS
    },
    result: {
      data: {
        myContributions: []
      }
    }
  }
];

test("Unauthorized users should be able to see admin view", async () => {
  let queries;

  await act(async () => {
    queries = await render(
      <Router history={createMemoryHistory({ initialEntries: ["/"] })}>
        <MockedProvider mocks={unAuthMocks} addTypename={false}>
          <App />
        </MockedProvider>
      </Router>
    );
  });

  await wait(() => {
    expect(queries.queryByTestId("admin-link")).toBe(null);
  });
});

test("Loading admin page without authorization, should redirect to landing page", async () => {
  let queries;

  await act(async () => {
    queries = await render(
      <Router history={createMemoryHistory({ initialEntries: ["/admin"] })}>
        <MockedProvider mocks={unAuthMocks} addTypename={false}>
          <App />
        </MockedProvider>
      </Router>
    );
  });

  // admin-view should not be present
  await wait(() => {
    expect(queries.queryByTestId("admin-view")).toBe(null);
  });

  // donate-button from landing page should be present instead
  await wait(() => {
    expect(queries.getByTestId("donate-button")).toBeInTheDocument();
  });
});

const regularUserMocks = [
  {
    request: { query: IDENTITY },
    result: {
      data: {
        whoAmI: {
          id: "someId",
          name: "name",
          email: "email",
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
      query: MY_CONTRIBUTIONS
    },
    result: {
      data: {
        myContributions: []
      }
    }
  }
];

test("Regular users should not be able to see admin view", async () => {
  let queries;

  await act(async () => {
    queries = await render(
      <Router history={createMemoryHistory({ initialEntries: ["/"] })}>
        <MockedProvider mocks={regularUserMocks} addTypename={false}>
          <App />
        </MockedProvider>
      </Router>
    );
  });

  // no link to admin page
  await wait(() => {
    expect(queries.queryByTestId("admin-link")).toBe(null);
  });
});

test("Regular users landing on admin page, should be redirected to landing page", async () => {
  let queries;

  await act(async () => {
    queries = await render(
      <Router history={createMemoryHistory({ initialEntries: ["/admin"] })}>
        <MockedProvider mocks={regularUserMocks} addTypename={false}>
          <App />
        </MockedProvider>
      </Router>
    );
  });

  // admin-view should not be present
  await wait(() => {
    expect(queries.queryByTestId("admin-view")).toBe(null);
  });

  // donate-button from landing page should be present instead
  await wait(() => {
    expect(queries.getByTestId("donate-button")).toBeInTheDocument();
  });

  // no links to admin page
  await wait(() => {
    expect(queries.queryByTestId("admin-link")).toBe(null);
  });
});

const adminMock = [
  {
    request: { query: IDENTITY },
    result: {
      data: {
        whoAmI: {
          id: "someId",
          name: "name",
          email: "email",
          permissions: ["ADMIN"]
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
      query: MY_CONTRIBUTIONS
    },
    result: {
      data: {
        myContributions: []
      }
    }
  }
];

test("Admin can use the admin page", async () => {
  let queries;

  await act(async () => {
    queries = await render(
      <Router history={createMemoryHistory({ initialEntries: ["/"] })}>
        <MockedProvider mocks={adminMock} addTypename={false}>
          <App />
        </MockedProvider>
      </Router>
    );
  });

  // links to admin page
  await wait(() => {
    expect(queries.getByTestId("donate-button")).toBeInTheDocument();
    expect(queries.getByTestId("admin-link")).toBeInTheDocument();
  });

  act(() => {
    fireEvent.click(queries.getByTestId("admin-link"));
  });

  // admin-view should be present
  await wait(() => {
    expect(queries.queryByTestId("admin-view")).toBeInTheDocument();
  });
});
