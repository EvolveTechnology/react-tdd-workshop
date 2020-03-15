import React from "react";

import { Root } from "routes";

import { act } from "react-dom/test-utils";

import { render, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

// But the better solution is to write fewer, longer tests: https://kentcdodds.com/blog/write-fewer-longer-tests

describe("External services", () => {
  let queries;
  let credits;

  beforeAll(async () => {
    await act(async () => {
      queries = await render(<Root />);
    });
  });

  afterAll(cleanup);

  it("Mentions the icon providers and creates stripe element", async () => {
    // async blocks can only be in `it` blocks or `test` blocks
    credits = queries.getByText(/icons8/i);

    expect(credits).toBeInTheDocument();
    expect(credits.getAttribute("href")).toMatch("icons8.com");
  });
});
