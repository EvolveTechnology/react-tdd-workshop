import React from "react";
import { Flex, Heading } from "rebass/styled-components";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import { Dialog } from "components/Dialog";
import { ContributionCard } from "components/ContributionCard";
import { Header } from "components/Header";

import "@reach/dialog/styles.css";
import { stripeOptions } from "helpers/constants";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

function Landing() {
  const contributions = [];
  return (
    <>
      <Flex px={2} py={4} alignItems="center" flexDirection="column">
        <Header />
        <Elements stripe={stripePromise} options={stripeOptions}>
          <Dialog />
        </Elements>
      </Flex>

      <Flex px={1} my={2} justifyContent="center">
        <Heading
          p={2}
          fontWeight="bold"
          fontSize="2rem"
          color="highlight"
          data-testid="contributors-title"
        >
          Contributors
        </Heading>
      </Flex>

      <Flex justifyContent="center" alignItems="center" flexDirection="column">
        {contributions.map(contribution => (
          <ContributionCard key={contributions.id} {...contribution} />
        ))}
      </Flex>
    </>
  );
}

export default Landing;
