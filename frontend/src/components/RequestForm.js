import React from "react";
import { Box, Button, Flex, Heading } from "rebass/styled-components";

import { Input, Label } from "@rebass/forms";

export function RequestForm({ onSuccess, onError }) {
  const emailRef = React.useRef();

  const handleSubmit = e => {
    e.preventDefault();

    return onSuccess({
      email: emailRef.current.value
    });
  };

  return (
    <Flex flexDirection="column" my={1} alignItems="center">
      <Heading>Forgot password?</Heading>
      <Box my={2} sx={{ "> form > *": { margin: "0.5em 0" } }}>
        <form onSubmit={handleSubmit} data-testid="request-reset-form">
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
            data-testid="request-email"
          />
          <Button type="submit" width="100%" color="black" data-testid="submit-request">
            Request Reset
          </Button>
        </form>
      </Box>
    </Flex>
  );
}
