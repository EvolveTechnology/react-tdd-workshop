import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { Redirect } from "react-router-dom";
import { Flex, Heading, Text } from "rebass/styled-components";
import { useIdentity, usePermissions } from "providers/Auth";
import { ALL_CONTRIBUTIONS } from "graphql/queries";
import { ContributionCard } from "components/ContributionCard";

export function Admin() {
  const { id, name } = useIdentity();
  const permissions = usePermissions();

  const isAdmin = permissions.includes("ADMIN") && id;

  const { data } = useQuery(ALL_CONTRIBUTIONS, { skip: !isAdmin });

  if (!isAdmin) {
    return <Redirect to="/" />;
  }

  const allContributions = data?.allContributions ?? [];

  return (
    <>
      <Flex px={2} py={4} alignItems="center" flexDirection="column">
        <Heading>{name}</Heading>
        <Text>Admin</Text>
      </Flex>

      <Flex px={1} my={2} justifyContent="center">
        <Heading
          p={2}
          fontWeight="bold"
          fontSize="2rem"
          color="highlight"
          data-testid="admin-view"
        >
          All contributions
        </Heading>
      </Flex>

      <Flex justifyContent="center" alignItems="center" flexWrap="wrap">
        {allContributions.map(contribution => (
          <ContributionCard key={contribution.id} {...contribution} />
        ))}
      </Flex>
    </>
  );
}

export default Admin;
