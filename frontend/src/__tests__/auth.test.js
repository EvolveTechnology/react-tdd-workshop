import React from "react";
import { App } from "routes";
import { act } from "react-dom/test-utils";

import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { MockedProvider } from "@apollo/react-testing";

import { render, fireEvent, wait } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import { CREATE_USER, SIGN_OUT, SIGN_IN } from "graphql/mutations";

import { IDENTITY } from "graphql/queries";

const mocks = [
  {
    request: {
      query: IDENTITY
    },
    result: {
      data: { whoAmI: null }
    }
  },
  {
    request: {
      query: CREATE_USER,
      variables: {
        name: "name",
        email: "example@email.com",
        password: "weakpassword"
      }
    },
    result: {
      data: { signUp: { id: "randomId", name: "name" } }
    }
  },
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
      query: SIGN_OUT
    },
    result: {
      data: {
        signOut: {
          message: "Success"
        }
      }
    }
  },
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
      query: SIGN_IN,
      variables: {
        email: "example@email.com",
        password: "weakpassword"
      }
    },
    result: {
      data: {
        signIn: {
          id: "someId",
          name: "name",
          permissions: ["USER"]
        }
      }
    }
  },
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
      query: SIGN_OUT
    },
    result: {
      data: {
        signOut: {
          message: "Success"
        }
      }
    }
  },
  {
    request: {
      query: IDENTITY
    },
    result: {
      data: {
        whoAmI: null
      }
    }
  }
];

test("User Signs Up, is logged in, logs out, logs back in and logs out again", async () => {
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

  await wait(() => {
    expect(queries.getByTestId("login")).toBeInTheDocument();
    expect(queries.getByTestId("signup")).toBeInTheDocument();
  });

  // Navigate to Sign Up
  act(() => {
    fireEvent.click(queries.getByTestId("signup"));
  });

  await wait(() => {
    expect(queries.getByTestId("signup-name")).toBeInTheDocument();
  });

  // Sign Up
  queries.getByTestId("signup-name").value = "name";
  queries.getByTestId("signup-email").value = "example@email.com";
  queries.getByTestId("signup-password").value = "weakpassword";

  // Submit Sign Up
  await act(async () => {
    fireEvent.click(queries.getByTestId("submit-signup"));
  });

  // Should be now at Home/Landing page
  await wait(() => {
    expect(queries.getByTestId("donate-button")).toBeInTheDocument();
    expect(queries.getByTestId("logout")).toBeInTheDocument();
  });

  // log out
  act(() => {
    fireEvent.click(queries.getByTestId("logout"));
  });

  await wait(() => {
    expect(queries.getByTestId("login")).toBeInTheDocument();
  });

  // Navigate to log in
  await act(async () => {
    fireEvent.click(queries.getByTestId("login"));
  });

  // log in
  queries.getByTestId("login-email").value = "example@email.com";
  queries.getByTestId("login-password").value = "weakpassword";

  await act(async () => {
    fireEvent.click(queries.getByTestId("submit-login"));
  });

  await wait(() => {
    expect(queries.getByTestId("donate-button")).toBeInTheDocument();
    expect(queries.getByTestId("logout")).toBeInTheDocument();
  });

  // logout
  act(() => {
    fireEvent.click(queries.getByTestId("logout"));
  });

  // back to initial state
  await wait(() => {
    expect(queries.getByTestId("login")).toBeInTheDocument();
  });
});
