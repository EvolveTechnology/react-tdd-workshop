import React from "react";
import { Box, Flex, Heading } from "rebass/styled-components";

import { Input, Label } from "@rebass/forms";

export function RequestForm() {
  return (
    <Flex flexDirection="column" my={1} alignItems="center">
      <Heading>Forgot password?</Heading>
      <form data-testid="request-reset-form">
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
        </Box>
      </form>
    </Flex>
  );
}
