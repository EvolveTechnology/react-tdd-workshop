import React from "react";
import { Box, Flex, Heading } from "rebass/styled-components";

import { Input, Label } from "@rebass/forms";
import { useSearchQuery } from "hooks/useSearchQuery";

export function ResetForm() {
  const query = useSearchQuery();
  const token = query.get("resetToken");
  console.log(token);

  return (
    <Flex flexDirection="column" my={1} alignItems="center">
      <Heading>Reset password</Heading>
      <form data-testid="reset-form">
        <Box my={2} sx={{ "> input": { margin: 2 } }}>
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
          />
        </Box>
      </form>
    </Flex>
  );
}
