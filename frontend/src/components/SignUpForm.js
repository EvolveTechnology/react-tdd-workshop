import React from "react";
import { Box, Flex, Heading } from "rebass/styled-components";

import { Input, Label } from "@rebass/forms";

export function SignUpForm() {
  return (
    <Flex flexDirection="column" my={1} alignItems="center">
      <Heading>Sign Up</Heading>
      <form data-testid="signup-form">
        <Box my={2} sx={{ "> input": { margin: 2 } }}>
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
    </Flex>
  );
}
