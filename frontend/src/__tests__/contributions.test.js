import React from "react";
import { act } from "react-dom/test-utils";

import { render, wait } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import { Root } from "routes";

test("Get all Public Contributions", async () => {
  let queries;

  await act(async () => {
    queries = await render(<Root />);
  });

  await wait(() => {
    const contributions = queries.getAllByTestId("contribution-card");
    expect(contributions.length).toEqual(2);
  });
});
