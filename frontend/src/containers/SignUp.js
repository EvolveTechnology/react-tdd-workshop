import React from "react";
import { NavLink } from "react-router-dom";
import { Text } from "rebass/styled-components";
import { SignUpForm } from "components/SignUpForm";

export function SignUp() {
  return (
    <>
      <SignUpForm />
      <Text
        variant="nav"
        my={4}
        fontSize={2}
        fontWeight="bold"
        textAlign="center"
        style={{ textDecoration: "underline" }}
      >
        <NavLink to="/" data-testid="signup-back-home">
          Back
        </NavLink>
      </Text>
    </>
  );
}

export default SignUp;
