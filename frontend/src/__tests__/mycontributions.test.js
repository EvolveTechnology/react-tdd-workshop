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

import { CREATE_USER, SIGN_OUT } from "graphql/mutations";

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
          permissions: ["USER"],
          email: "example@email.com"
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
    request: {
      query: MY_CONTRIBUTIONS
    },
    result: {
      data: {
        myContributions: [
          {
            updatedAt: "2020-03-12T17:10:55.553Z",
            seen: false,
            id: "ck7m16q36uui90950k17msxoz",
            qty: 10,
            createdAt: "2020-03-10T15:10:07.506Z",
            private: false,
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
            private: false,
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
  }
];

test("A logged in user should be able to access: my contributions", async () => {
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

  let myContributionsLink;

  // starting on landing page
  await wait(() => {
    expect(queries.getByTestId("donate-button")).toBeInTheDocument();
  });

  await wait(() => {
    myContributionsLink = queries.getByTestId("my-contributions-link");
    expect(myContributionsLink).toBeInTheDocument();
  });

  // click on my contributions page link
  act(() => {
    fireEvent.click(myContributionsLink);
  });

  // my contributions, should be listed
  await wait(() => {
    expect(queries.getAllByTestId("my-contribution")).toHaveLength(2);
    // a back home button should be present
    expect(queries.getByTestId("back-home")).toBeInTheDocument();
  });

  // navigate back home
  act(() => {
    fireEvent.click(queries.getByTestId("back-home"));
  });

  // back at the landing page
  await wait(() => {
    expect(queries.getByTestId("donate-button")).toBeInTheDocument();
  });
});

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

test("Unauthorized users should NOT be able to access: my contributions", async () => {
  let queries;

  await act(async () => {
    queries = await render(
      <Router
        history={createMemoryHistory({ initialEntries: ["/mycontributions"] })}
      >
        <MockedProvider mocks={unAuthMocks} addTypename={false}>
          <App />
        </MockedProvider>
      </Router>
    );
  });

  // starting on landing page
  await wait(() => {
    expect(queries.queryByTestId("your-contributions")).toBe(null);
    expect(queries.queryByTestId("my-contributions-link")).toBe(null);
    expect(queries.getByTestId("donate-button")).toBeInTheDocument();
  });
});

const twoUsersMocks = [
  {
    request: {
      query: IDENTITY
    },
    result: {
      data: {
        whoAmI: {
          id: "someId",
          name: "name",
          permissions: ["USER"],
          email: "example@email.com"
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
    request: {
      query: MY_CONTRIBUTIONS
    },
    result: {
      data: {
        myContributions: [
          {
            updatedAt: "2020-03-12T17:10:55.553Z",
            seen: false,
            id: "ck7m16q36uui90950k17msxoz",
            qty: 10,
            createdAt: "2020-03-10T15:10:07.506Z",
            private: false,
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
            private: false,
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

test("After a user logs out, the next user should not see: my contributions", async () => {
  let queries;

  await act(async () => {
    queries = await render(
      <Router history={createMemoryHistory({ initialEntries: ["/"] })}>
        <MockedProvider mocks={twoUsersMocks} addTypename={false}>
          <App />
        </MockedProvider>
      </Router>
    );
  });

  await wait(() => {
    expect(queries.getByTestId("my-contributions-link")).toBeInTheDocument();
  });

  act(() => {
    fireEvent.click(queries.getByTestId("logout"));
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

  // a just signed up user won't have contributions
  await wait(() => {
    expect(queries.queryByTestId("my-contributions-link")).toBe(null);
  });
});
