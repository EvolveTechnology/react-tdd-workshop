import React from "react";
import {
  Box,
  Card,
  Flex,
  Heading,
  Image,
  Text
} from "rebass/styled-components";

import CoffeeToGo from "assets/coffee_to_go.png";

export function ContributionCard() {
  return (
    <Card
      bg="muted"
      color="highlight"
      my={2}
      mx={2}
      width="90%"
      maxWidth="575px"
      borderRadius={8}
      sx={{ width: [320, 375, 425, 600], borderRadius: 8 }}
      data-testid="contribution-card"
    >
      <Flex justifyContent="space-around">
        <Flex flex={4} flexDirection="column" p={1}>
          <Flex>
            <Heading fontSize={[3, 4]}>Anonymous</Heading>
          </Flex>
          <Text fontSize={3} as="p" style={{ wordBreak: "break-word" }}>
            Hi there! Keep up the awesome work!
          </Text>
        </Flex>

        <Flex alignItems="center" mx={1}>
          <Box
            fontSize={5}
            sx={{
              display: "flex",
              alignItems: "flex-end",
              color: "white",
              bg: "primary",
              px: 2,
              py: 1,
              borderRadius: 9999
            }}
          >
            <p>+4</p>
            <Image src={CoffeeToGo} width="44px" />
          </Box>
        </Flex>
      </Flex>
    </Card>
  );
}
