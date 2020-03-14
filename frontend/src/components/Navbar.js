import React from "react";
import { Box, Flex, Link, Text } from "rebass/styled-components";

export function Navbar() {
  return (
    <Flex
      px={2}
      py={2}
      color="white"
      bg="black"
      alignItems="center"
      data-testid="navbar"
    >
      <Text p={2} fontWeight="bold" fontSize={4}>
        Buy me a coffee
      </Text>
      <Box mx="auto" />
      <Link variant="nav" href="#!" fontSize={2}>
        Log In
      </Link>
    </Flex>
  );
}
