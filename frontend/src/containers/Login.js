import React from "react";
import { NavLink } from "react-router-dom";
import { Text } from "rebass/styled-components";
import { LoginForm } from "components/LoginForm";

export function Login() {
  return (
    <>
      <LoginForm />
      <Text
        variant="nav"
        my={4}
        fontSize={2}
        fontWeight="bold"
        textAlign="center"
        style={{ textDecoration: "underline" }}
      >
        <NavLink to="/" data-testid="back-home">
          Back
        </NavLink>
      </Text>
    </>
  );
}

export default Login;