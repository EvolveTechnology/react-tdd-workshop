import React from "react";
import { NavLink, useLocation, useHistory } from "react-router-dom";
import { Box, Button, Flex, Text } from "rebass/styled-components";
import { useMutation } from "@apollo/react-hooks";
import { useIdentity } from "providers/Auth";
import { SIGN_OUT } from "graphql/mutations";
import { IDENTITY } from "graphql/queries";

export function Navbar() {
  const { pathname } = useLocation();
  const isLogin = pathname.includes("login");
  const isSignUp = pathname.includes("signup");
  const { id, loading: authLoading } = useIdentity();

  const history = useHistory();
  const [logOut] = useMutation(SIGN_OUT, {
    onCompleted: () => history.push("/"),
    refetchQueries: [{ query: IDENTITY }]
  });

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

      {!authLoading && (
        <>
          {!id && !isLogin && (
            <Text
              variant="nav"
              fontSize={3}
              fontWeight="bold"
              mx={2}
              style={{ textDecoration: "underline" }}
            >
              <NavLink to="/login" data-testid="login">
                Log In
              </NavLink>
            </Text>
          )}
          {!id && !isSignUp && (
            <Text
              variant="nav"
              fontSize={3}
              fontWeight="bold"
              mx={2}
              style={{ textDecoration: "underline" }}
            >
              <NavLink to="/signup" data-testid="signup">
                Sign Up
              </NavLink>
            </Text>
          )}
          {id && (
            <Button
              color="secondary"
              variant="outline"
              fontSize={3}
              fontWeight="bold"
              mx={2}
              onClick={logOut}
              tyle={{ border: "1px solid" }}
              data-testid="logout"
            >
              Logout
            </Button>
          )}
        </>
      )}
    </Flex>
  );
}
