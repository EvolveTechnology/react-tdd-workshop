import React from "react";

import { Root } from "routes";

import { act } from "react-dom/test-utils";

import { render, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

// But the better solution is to write fewer, longer tests: https://kentcdodds.com/blog/write-fewer-longer-tests

describe("Layout elements", () => {
  let queries;

  beforeAll(async () => {
    await act(async () => {
      queries = await render(<Root />);
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
