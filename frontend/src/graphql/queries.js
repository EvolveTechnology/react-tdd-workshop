import { gql } from "apollo-boost";

export const PUBLIC_CONTRIBUTIONS = gql`
  query publicContribs {
    publicContributions {
      user {
        name
      }
      message
      createdAt
      qty
      seen
      id
    }
  }
`;

export const ALL_CONTRIBUTIONS = gql`
  query allContribs {
    allContributions {
      id
      qty
      message
      private
      seen
      user {
        name
      }
    }
  }
`;

export const IDENTITY = gql`
  query identity {
    whoAmI {
      id
      name
      email
      permissions
    }
  }
`;

export const COFFEE_RATE = gql`
  query coffeePrice {
    coffeePrice {
      currency
      unitPrice
    }
  }
`;

export const MY_CONTRIBUTIONS = gql`
  query myContribs {
    myContributions {
      user {
        name
      }
      id
      qty
      message
      createdAt
      private
    }
  }
`;
