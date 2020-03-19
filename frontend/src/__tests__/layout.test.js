import React from "react";

import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { MockedProvider } from "@apollo/react-testing";

import { act } from "react-dom/test-utils";

import { render, wait } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import { App } from "routes";
// But the better solution is to write fewer, longer tests: https://kentcdodds.com/blog/write-fewer-longer-tests

test("Layout elements", async () => {
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
    const donateButton = queries.getByTestId("donate-button");
    const navbar = queries.getByTestId("navbar");
    const contributorsTitle = queries.getByTestId("contributors-title");

    expect(donateButton).toBeInTheDocument();
    expect(navbar).toBeInTheDocument();
    expect(contributorsTitle).toBeInTheDocument();
  });
});
