import React from "react";
import { NavLink } from "react-router-dom";
import { Text } from "rebass/styled-components";
import { RequestForm } from "components/RequestForm";

export function Request() {
  return (
    <>
      <RequestForm />
      <Text
        variant="nav"
        my={4}
        fontSize={2}
        fontWeight="bold"
        textAlign="center"
        style={{ textDecoration: "underline" }}
      >
        <NavLink to="/" data-testid="request-reset-back-home">
          Back
        </NavLink>
      </Text>
    </>
  );
}

export default Request;
