import React from "react";
import { Box, Button, Flex, Heading } from "rebass/styled-components";

import { Input, Label } from "@rebass/forms";
import { useSearchQuery } from "hooks/useSearchQuery";

export function ResetForm({ onSuccess, onError }) {
  const passwordRef = React.useRef();
  const confirmPasswordRef = React.useRef();

  const query = useSearchQuery();
  const token = query.get("resetToken");

  if (!token) {
    return (
      <Flex flexDirection="column" my={3} alignItems="center" data-testid="missing-token-message">
        <Heading color="black">Missing Token</Heading>
      </Flex>
    );
  }

  const handleSubmit = e => {
    e.preventDefault();

    return onSuccess({
      token,
      password: passwordRef.current.value,
      confirmPassword: confirmPasswordRef.current.value
    });
  };

  return (
    <Flex flexDirection="column" my={1} alignItems="center">
      <Heading>Reset password</Heading>
      <Box my={2} sx={{ "> form > *": { margin: "0.5em 0" } }}>
        <form onSubmit={handleSubmit} data-testid="reset-form">
          <Label htmlFor="email" fontSize={3}>
            New Password
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="jane@example.com"
            fontSize={2}
            maxWidth="300px"
            autoComplete="email"
            ref={passwordRef}
            data-testid="password-reset"
          />
          <Label htmlFor="email" fontSize={3}>
            Confirm Password
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="jane@example.com"
            fontSize={2}
            maxWidth="300px"
            autoComplete="email"
            ref={confirmPasswordRef}
            data-testid="confirm=password-reset"
          />
          <Button
            type="submit"
            width="100%"
            color="black"
            data-testid="submit-reset"
          >
            Confirm
          </Button>
        </form>
      </Box>
    </Flex>
  );
}
