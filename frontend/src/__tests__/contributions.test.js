import React from "react";
import { act } from "react-dom/test-utils";

import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { MockedProvider } from "@apollo/react-testing";

import { render, wait } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import { App } from "routes";
import { PUBLIC_CONTRIBUTIONS } from "graphql/queries";

const publiContributionsMock = {
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
};

test("Get all Public Contributions", async () => {
  let queries;

  await act(async () => {
    queries = await render(
      <Router history={createMemoryHistory()}>
        <MockedProvider mocks={[publiContributionsMock]} addTypename={false}>
          <App />
        </MockedProvider>
      </Router>
    );
  });

  await wait(() => {
    const contributions = queries.getAllByTestId("contribution-card");
    expect(contributions.length).toEqual(2);
  });
});
