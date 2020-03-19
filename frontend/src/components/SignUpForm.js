import React from "react";
import { Box, Button, Flex, Heading, Text } from "rebass/styled-components";

import { Input, Label } from "@rebass/forms";

export function SignUpForm({ onSuccess, onError, error }) {
  const nameRef = React.useRef();
  const emailRef = React.useRef();
  const passwordRef = React.useRef();

  const handleSubmit = e => {
    e.preventDefault();

    const name = nameRef.current ? nameRef.current.value : "";
    const email = emailRef.current ? emailRef.current.value : "";
    const password = passwordRef.current ? passwordRef.current.value : "";

    if (name.trim() && email.trim() && password.trim()) {
      return onSuccess({
        name: name.trim(),
        email: email.trim(),
        password: password.trim()
      });
    }

    return onError({ message: "Invalid User Input" });
  };

  return (
    <Flex flexDirection="column" my={1} alignItems="center">
      <Heading>Sign Up</Heading>
      <Box my={2} sx={{ "> form > *": { margin: "0.5em 0" } }}>
        <form onSubmit={handleSubmit} data-testid="signup-form">
          <Label htmlFor="name" fontSize={3}>
            Name
          </Label>
          <Input
            id="name"
            name="name"
            type="text"
            placeholder="Your name"
            fontSize={2}
            maxWidth="300px"
            ref={nameRef}
            data-testid="signup-name"
          />
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
            data-testid="signup-email"
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
            ref={passwordRef}
            data-testid="signup-password"
          />
          <Button
            type="submit"
            width="100%"
            color="black"
            data-testid="submit-signup"
          >
            Sign Up
          </Button>
        </form>
        {error && (
          <Text my={1} justifyContent="flex-end" color="#ff0000">
            {error.message || "Fatal Error"}
          </Text>
        )}
      </Box>
    </Flex>
  );
}
