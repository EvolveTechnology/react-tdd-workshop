import React from "react";

import { Footer } from "components/Footer";
import { mount } from "enzyme";

import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

describe("Credit icon providers", () => {
  const { getByText } = render(<Footer />);
  const element = getByText(/icons8/i);

  it("Mentions the icon providers", () => {
    expect(element).toBeInTheDocument();
  });

  it("Links to the icon providers", () => {
    expect(element.getAttribute("href")).toMatch("icons8.com");
  });
});

test("Credit style", () => {
  let app = mount(<Footer />);
  expect(app.html()).toMatchSnapshot();
});
