import { gql } from "apollo-boost";

export const CREATE_USER = gql`
  mutation createUser($email: String!, $password: String!, $name: String!) {
    signUp(email: $email, password: $password, name: $name) {
      id
      name
    }
  }
`;

export const SIGN_IN = gql`
  mutation signIn($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
      id
      name
      permissions
    }
  }
`;

export const SIGN_OUT = gql`
  mutation signOut {
    signOut {
      message
    }
  }
`;

export const CREATE_CONTRIBUTION = gql`
  mutation createContrib(
    $qty: Int!
    $message: String
    $token: String!
    $private: Boolean
  ) {
    createContribution(
      qty: $qty
      message: $message
      token: $token
      private: $private
    ) {
      qty
      id
    }
  }
`;

export const MARK_AS_SEEN = gql`
  mutation markAsSeen($id: ID!) {
    updateSeen(id: $id) {
      id
      qty
      seen
    }
  }
`;

export const REQUEST_RESET = gql`
  mutation requestReset($email: String!) {
    requestReset(email: $email) {
      message
    }
  }
`;

export const RESET_PASSWORD = gql`
  mutation resetPassword(
    $resetToken: String!
    $password: String!
    $confirmPassword: String!
  ) {
    resetPassword(
      resetToken: $resetToken
      password: $password
      confirmPassword: $confirmPassword
    ) {
      name
      email
    }
  }
`;
