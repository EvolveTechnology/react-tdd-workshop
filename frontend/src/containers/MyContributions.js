import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { NavLink, Redirect } from "react-router-dom";
import { Flex, Heading, Text } from "rebass/styled-components";
import { useIdentity } from "providers/Auth";
import { MY_CONTRIBUTIONS } from "graphql/queries";
import { ContributionCard } from "components/ContributionCard";

export function MyContributions() {
  const { id, name, email } = useIdentity();
  const { data } = useQuery(MY_CONTRIBUTIONS);
  const myContributions = data?.myContributions ?? [];

  if (!id) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <Flex px={2} py={4} alignItems="center" flexDirection="column">
        <Heading>{name}</Heading>
        <Text>{email}</Text>
      </Flex>

      <Flex px={1} my={2} justifyContent="center">
        <Heading
          p={2}
          fontWeight="bold"
          fontSize="2rem"
          color="highlight"
          data-testid="your-contributions"
        >
          Your contributions
        </Heading>
      </Flex>

      <Flex justifyContent="center" alignItems="center" flexDirection="column">
        {myContributions.map(contribution => (
          <ContributionCard
            key={contribution.id}
            {...contribution}
            testId="my-contribution"
          />
        ))}
      </Flex>

      <Text
        variant="nav"
        my={4}
        fontSize={2}
        fontWeight="bold"
        textAlign="center"
        style={{ textDecoration: "underline" }}
      >
        <NavLink to="/" data-testid="back-home">
          Home
        </NavLink>
      </Text>
    </>
  );
}

export default MyContributions;
