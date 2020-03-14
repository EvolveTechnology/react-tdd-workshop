import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Box, Flex, Text } from "rebass/styled-components";

export function Navbar() {
  const { pathname } = useLocation();
  const isLogin = pathname.includes("login");

  return (
    <Flex
      px={2}
      py={2}
      color="white"
      bg="black"
      alignItems="center"
      data-testid="navbar"
    >
      <Text p={2} fontWeight="bold" fontSize="2rem">
        <NavLink to="/" data-testid="home">
          Buy me a coffee
        </NavLink>
      </Text>
      <Box mx="auto" />
      {!isLogin && (
        <Text variant="nav" fontSize={3} fontWeight="bold">
          <NavLink to="/login" data-testid="login">
            Log In
          </NavLink>
        </Text>
      )}
    </Flex>
  );
}
