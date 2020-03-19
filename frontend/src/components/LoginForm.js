import React from "react";
import { NavLink } from "react-router-dom";
import { Box, Button, Flex, Heading, Text } from "rebass/styled-components";

import { Input, Label } from "@rebass/forms";

export function LoginForm({ onSuccess, onError }) {
  const emailRef = React.useRef();
  const passwordRef = React.useRef();

  const handleSubmit = e => {
    e.preventDefault();

    const email = emailRef.current ? emailRef.current.value : "";
    const password = passwordRef.current ? passwordRef.current.value : "";

    if (email.trim() && password.trim()) {
      return onSuccess({
        email: email.trim(),
        password: password.trim()
      });
    }

    return onError({ message: "Invalid User Input" });
  };

  return (
    <Flex flexDirection="column" my={1} alignItems="center">
      <Heading>Log in</Heading>
      <Box my={2} sx={{ "> form > *": { margin: "0.5em 0" } }}>
        <form data-testid="login-form" onSubmit={handleSubmit}>
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
            ref={emailRef}
            data-testid="login-email"
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
            data-testid="login-password"
            ref={passwordRef}
          />
          <Button
            type="submit"
            width="100%"
            color="black"
            data-testid="submit-login"
          >
            Login
          </Button>
        </form>
      </Box>
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
