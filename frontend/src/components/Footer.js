import React from "react";
import { Flex, Image, Text } from "rebass/styled-components";

import CoffeeToGo from "assets/coffee_to_go.png";
import DebitCard from "assets/debit_card.png";
import ReactLogo from "assets/react_logo.png";

export function Footer() {
  return (
    <>
      <Flex py={4} justifyContent="center">
        <Image src={DebitCard} />
        <Image src={CoffeeToGo} />
        <Image src={ReactLogo} width="64px" />
      </Flex>
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
    </>
  );
}
