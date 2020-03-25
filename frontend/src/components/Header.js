import React from "react";
import { Text } from "rebass/styled-components";
import { NavLink } from "react-router-dom";
import { useIdentity, usePermissions } from "providers/Auth";
import { useQuery } from "@apollo/react-hooks";
import { MY_CONTRIBUTIONS } from "graphql/queries";

export function Header() {
  const { id } = useIdentity();
  const permissions = usePermissions();
  const isAdmin = permissions.includes("ADMIN") && id;
  const shouldSkipMyContributions = isAdmin || !id;

  const { data } = useQuery(MY_CONTRIBUTIONS, {
    skip: shouldSkipMyContributions
  });

  const personalContributions = data?.myContributions ?? [];
  const hasPersonalContributions = !!personalContributions.length;

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
      {hasPersonalContributions && (
        <Text
          color="highlight"
          variant="nav"
          fontSize={3}
          fontWeight="bold"
          mx={2}
          style={{ textDecoration: "underline" }}
        >
          <NavLink to="/mycontributions" data-testid="my-contributions-link">
            And you are one of them!
          </NavLink>
        </Text>
      )}
      {isAdmin && (
        <Text
          color="highlight"
          variant="nav"
          fontSize={3}
          fontWeight="bold"
          mx={2}
          style={{ textDecoration: "underline" }}
        >
          <NavLink to="/admin" data-testid="admin-link">
            Admin View
          </NavLink>
        </Text>
      )}
    </>
  );
}
