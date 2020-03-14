import React from "react";
import { Flex, Heading } from "rebass/styled-components";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import { Dialog } from "components/Dialog";
import { ContributionCard } from "components/ContributionCard";
import { Header } from "components/Header";

import "@reach/dialog/styles.css";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);
const stripeOptions = {
  fonts: [
    {
      family: "Inconsolata",
      src:
        "url('https://fonts.gstatic.com/s/inconsolata/v18/QldKNThLqRwH-OJ1UHjlKGlZ5qg.woff2') format('woff2')",
      style: "normal"
    }
  ]
};

function Landing() {
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
          fontSize={5}
          color="highlight"
          data-testid="contributors-title"
        >
          Contributors
        </Heading>
      </Flex>

      <Flex justifyContent="center" alignItems="center" flexDirection="column">
        <ContributionCard />
        <ContributionCard />
        <ContributionCard />
      </Flex>
    </>
  );
}

export default Landing;
