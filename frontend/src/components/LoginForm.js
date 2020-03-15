import React from "react";
import { NavLink } from "react-router-dom";
import { Box, Flex, Heading, Text } from "rebass/styled-components";

import { Input, Label } from "@rebass/forms";

export function LoginForm() {
  return (
    <Flex flexDirection="column" my={1} alignItems="center">
      <Heading>Log in</Heading>
      <form data-testid="login-form">
        <Box my={2} sx={{ "> input": { margin: 2 } }}>
          <Label htmlFor="email" fontSize={3}>
            Email
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="jane@example.com"
            fontSize={2}
            maxWidth="300px"
            autoComplete="email"
          />
          <Label htmlFor="password" fontSize={3}>
            Password
          </Label>
          <Input
            id="password"
            name="password"
            type="password"
            fontSize={2}
            maxWidth="300px"
            placeholder="password"
            autoComplete="current-password"
          />
        </Box>
      </form>
      <Text
        my={1}
        fontSize={2}
        textAlign="center"
        style={{ textDecoration: "underline" }}
      >
        <NavLink to="/request" data-testid="request-reset">
          forgot password
        </NavLink>
      </Text>
    </Flex>
  );
}
