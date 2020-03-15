import React from "react";

import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { App, Root } from "routes";

import { act } from "react-dom/test-utils";

import { render, fireEvent, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

// But the better solution is to write fewer, longer tests: https://kentcdodds.com/blog/write-fewer-longer-tests

describe("Login Route", () => {
  let queries;

  beforeAll(async () => {
    await act(async () => {
      queries = await render(<Root />);
    });
  });

  afterAll(cleanup);

  it("is possible to navigate back and forth from login to home", async () => {
    const loginBtn = queries.getByTestId("login");
    const homeBtn = queries.getByTestId("home");
    const donateBtn = queries.getByTestId("donate-button");

    expect(donateBtn).toBeInTheDocument();

    await act(async () => {
      fireEvent.click(loginBtn);
    });

    const loginForm = queries.getByTestId("login-form");

    expect(loginForm).toBeInTheDocument();

    await act(async () => {
      fireEvent.click(homeBtn);
    });

    expect(queries.getByTestId("login")).toBeInTheDocument();
    expect(loginForm).not.toBeInTheDocument();
    expect(queries.getByTestId("donate-button")).toBeInTheDocument();

    act(() => {
      fireEvent.click(queries.getByTestId("login"));
    });

    expect(queries.getByTestId("login-form")).toBeInTheDocument();

    const backBtn = queries.getByTestId("back-home");

    await act(async () => {
      fireEvent.click(backBtn);
    });

    expect(queries.getByTestId("login")).toBeInTheDocument();
    expect(queries.getByTestId("donate-button")).toBeInTheDocument();
  });
});

describe("SignUp Route", () => {
  let queries;

  beforeAll(async () => {
    await act(async () => {
      queries = await render(<Root />);
    });
  });

  afterAll(cleanup);

  it("is possible to navigate back and forth from signup to home", async () => {
    const signUp = queries.getByTestId("signup");
    const homeBtn = queries.getByTestId("home");
    const donateBtn = queries.getByTestId("donate-button");

    expect(donateBtn).toBeInTheDocument();

    await act(async () => {
      fireEvent.click(signUp);
    });

    const signUpForm = queries.getByTestId("signup-form");

    expect(signUpForm).toBeInTheDocument();

    await act(async () => {
      fireEvent.click(homeBtn);
    });

    expect(queries.getByTestId("signup")).toBeInTheDocument();
    expect(signUpForm).not.toBeInTheDocument();
    expect(queries.getByTestId("donate-button")).toBeInTheDocument();

    act(() => {
      fireEvent.click(queries.getByTestId("signup"));
    });

    expect(queries.getByTestId("signup-form")).toBeInTheDocument();

    const backBtn = queries.getByTestId("signup-back-home");

    await act(async () => {
      fireEvent.click(backBtn);
    });

    expect(queries.getByTestId("signup")).toBeInTheDocument();
    expect(queries.getByTestId("donate-button")).toBeInTheDocument();
  });
});

describe("Request Reset Route", () => {
  let queries;

  beforeAll(async () => {
    await act(async () => {
      queries = await render(<Root />);
    });
  });

  afterAll(cleanup);

  it("is possible to try to log in and request password reset", async () => {
    const loginBtn = queries.getByTestId("login");

    await act(async () => {
      fireEvent.click(loginBtn);
    });

    const requestReset = queries.getByTestId("request-reset");

    expect(requestReset).toBeInTheDocument();

    await act(async () => {
      fireEvent.click(requestReset);
    });

    const requestResetForm = queries.getByTestId("request-reset-form");

    expect(requestResetForm).toBeInTheDocument();

    const backBtn = queries.getByTestId("request-reset-back-home");

    await act(async () => {
      fireEvent.click(backBtn);
    });

    expect(queries.getByTestId("donate-button")).toBeInTheDocument();
  });
});

describe("Reset password Route, without token", () => {
  let queries;
  const history = createMemoryHistory({ initialEntries: ["/reset"] });

  beforeAll(async () => {
    await act(async () => {
      queries = await render(
        <Router history={history}>
          <App />
        </Router>
      );
    });
  });

  afterAll(cleanup);

  it("is possible to land in the /reset route", () => {
    const resetForm = queries.getByTestId("missing-token-message");

    expect(resetForm).toBeInTheDocument();
  });
});

describe("Reset password Route, with token", () => {
  let queries;
  const history = createMemoryHistory({
    initialEntries: ["/reset?resetToken=sakdjskajld"]
  });

  beforeAll(async () => {
    await act(async () => {
      queries = await render(
        <Router history={history}>
          <App />
        </Router>
      );
    });
  });

  afterAll(cleanup);

  it("is possible to land in the /reset route", () => {
    const resetForm = queries.getByTestId("reset-form");

    expect(resetForm).toBeInTheDocument();
  });
});
