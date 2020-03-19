import React from "react";

import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { MockedProvider } from "@apollo/react-testing";

import { act } from "react-dom/test-utils";

import { render, fireEvent, wait } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import { App } from "routes";

test("Login Route", async () => {
  let queries;
  const history = createMemoryHistory({ initialEntries: ["/"] });

  await act(async () => {
    queries = await render(
      <Router history={history}>
        <MockedProvider mocks={[]} addTypename={false}>
          <App />
        </MockedProvider>
      </Router>
    );
  });

  await wait(() => {
    expect(queries.getByTestId("donate-button")).toBeInTheDocument();
  });

  act(() => {
    fireEvent.click(queries.getByTestId("login"));
  });

  await wait(() => {
    expect(queries.getByTestId("login-form")).toBeInTheDocument();
  });

  act(() => {
    fireEvent.click(queries.getByTestId("home"));
  });

  await wait(() => {
    expect(queries.getByTestId("login")).toBeInTheDocument();
    expect(queries.getByTestId("donate-button")).toBeInTheDocument();
  });

  act(() => {
    fireEvent.click(queries.getByTestId("login"));
  });

  await wait(() => {
    expect(queries.getByTestId("login-form")).toBeInTheDocument();
  });

  act(() => {
    fireEvent.click(queries.getByTestId("back-home"));
  });

  await wait(() => {
    expect(queries.getByTestId("login")).toBeInTheDocument();
    expect(queries.getByTestId("donate-button")).toBeInTheDocument();
  });
});

test("SignUp Route", async () => {
  let queries;
  const history = createMemoryHistory({ initialEntries: ["/"] });

  await act(async () => {
    queries = await render(
      <Router history={history}>
        <MockedProvider mocks={[]} addTypename={false}>
          <App />
        </MockedProvider>
      </Router>
    );
  });

  await wait(() => {
    expect(queries.getByTestId("donate-button")).toBeInTheDocument();
  });

  act(() => {
    fireEvent.click(queries.getByTestId("signup"));
  });

  await wait(() => {
    expect(queries.getByTestId("signup-form")).toBeInTheDocument();
  });

  act(() => {
    fireEvent.click(queries.getByTestId("home"));
  });

  await wait(() => {
    expect(queries.getByTestId("signup")).toBeInTheDocument();
    expect(queries.getByTestId("donate-button")).toBeInTheDocument();
  });

  act(() => {
    fireEvent.click(queries.getByTestId("signup"));
  });

  await wait(() => {
    expect(queries.getByTestId("signup-form")).toBeInTheDocument();
  });

  act(() => {
    fireEvent.click(queries.getByTestId("signup-back-home"));
  });

  await wait(() => {
    expect(queries.getByTestId("signup")).toBeInTheDocument();
    expect(queries.getByTestId("donate-button")).toBeInTheDocument();
  });
});

test("Request Reset Route", async () => {
  let queries;
  const history = createMemoryHistory({ initialEntries: ["/"] });

  await act(async () => {
    queries = await render(
      <Router history={history}>
        <MockedProvider mocks={[]} addTypename={false}>
          <App />
        </MockedProvider>
      </Router>
    );
  });

  act(() => {
    fireEvent.click(queries.getByTestId("login"));
  });

  await wait(() => {
    expect(queries.getByTestId("request-reset")).toBeInTheDocument();
  });

  act(() => {
    fireEvent.click(queries.getByTestId("request-reset"));
  });

  await wait(() => {
    expect(queries.getByTestId("request-reset-form")).toBeInTheDocument();
  });

  act(() => {
    fireEvent.click(queries.getByTestId("request-reset-back-home"));
  });

  await wait(() => {
    expect(queries.getByTestId("donate-button")).toBeInTheDocument();
  });
});

test("Reset password Route, without token", async () => {
  let queries;
  const history = createMemoryHistory({ initialEntries: ["/reset"] });

  await act(async () => {
    queries = await render(
      <Router history={history}>
        <MockedProvider mocks={[]} addTypename={false}>
          <App />
        </MockedProvider>
      </Router>
    );
  });

  await wait(() => {
    expect(queries.getByTestId("missing-token-message")).toBeInTheDocument();
  });
});

test("Reset password Route, with token", async () => {
  let queries;
  const history = createMemoryHistory({
    initialEntries: ["/reset?resetToken=sakdjskajld"]
  });

  await act(async () => {
    queries = await render(
      <Router history={history}>
        <MockedProvider mocks={[]} addTypename={false}>
          <App />
        </MockedProvider>
      </Router>
    );
  });

  await wait(() => {
    expect(queries.getByTestId("reset-form")).toBeInTheDocument();
  });
});
