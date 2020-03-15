import React from "react";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import Routes from "routes";

import { act } from "react-dom/test-utils";

import { render, fireEvent, cleanup } from "@testing-library/react";
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

  afterAll(cleanup);

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

  afterAll(cleanup);

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
  let queries;

  beforeAll(async () => {
    await act(async () => {
      queries = await render(<Routes />);
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
      queries = await render(<Routes />);
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
      queries = await render(<Routes />);
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

describe("Reset password Route", () => {
  let queries;

  beforeAll(async () => {
    await act(async () => {
      queries = await render(<Routes />);
    });
  });

  afterAll(cleanup);

  it("is possible to land in the /reset route", () => {
    const resetForm = queries.getByTestId("reset-form");

    expect(resetForm).toBeInTheDocument();
  });
});
