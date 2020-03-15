import React from "react";
import { NavLink } from "react-router-dom";
import { Text } from "rebass/styled-components";
import { ResetForm } from "components/ResetForm";

export function Reset() {
  return (
    <>
      <ResetForm onSuccess={console.log} onError={console.log} />
      <Text
        variant="nav"
        my={4}
        fontSize={2}
        fontWeight="bold"
        textAlign="center"
        style={{ textDecoration: "underline" }}
      >
        <NavLink to="/" data-testid="reset-back-home">
          Home
        </NavLink>
      </Text>
    </>
  );
}

export default Reset;
