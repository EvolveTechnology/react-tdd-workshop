import React from "react";
import { Text } from "rebass/styled-components";

export function Header() {
  return (
    <>
      <Text m={2} fontSize={3} as="p" textAlign="center">
        Buy me a coffee is a way for you to support my work.
      </Text>
      <Text m={2} fontSize={3} as="p" textAlign="center">
        So far,{" "}
        <Text color="highlight" as="span" fontWeight="bold">
          3
        </Text>{" "}
        people have donated a total of{" "}
        <Text color="highlight" as="span" fontWeight="bold">
          4440
        </Text>{" "}
        cups of coffee.
      </Text>
    </>
  );
}
