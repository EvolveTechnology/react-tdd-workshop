import React from "react";
import { Box, Button, Flex, Heading } from "rebass/styled-components";

import { Input, Label } from "@rebass/forms";

export function SignUpForm({ onSuccess, onError }) {
  const nameRef = React.useRef();
  const emailRef = React.useRef();
  const passwordRef = React.useRef();

  const handleSubmit = e => {
    e.preventDefault();

    return onSuccess({
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value
    });
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
          <Button type="submit" width="100%" color="black" data-testid="submit-signup">
            Sign Up
          </Button>
        </form>
      </Box>
    </Flex>
  );
}
