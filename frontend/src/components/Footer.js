import React from "react";
import { Flex, Text } from "rebass/styled-components";

export function Footer() {
  return (
    <Flex fontSize={2}>
      <Text
        as="a"
        href="https://icons8.com/"
        rel="noopener noreferrer"
        margin="0 auto 1em"
        style={{ textDecoration: "underline" }}
      >
        Icons thanks to Icons8
      </Text>
    </Flex>
  );
}
