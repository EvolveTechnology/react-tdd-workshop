import React from "react";
import { Flex, Heading } from "rebass/styled-components";

import { Container } from "components/Container";
import { Dialog } from "components/Dialog";
import { ContributionCard } from "components/ContributionCard";
import { Footer } from "components/Footer";
import { Header } from "components/Header";
import { Navbar } from "components/Navbar";

import "@reach/dialog/styles.css";

function Landing() {
  return (
    <Container>
      <Navbar />

      <Flex px={2} py={4} alignItems="center" flexDirection="column">
        <Header />
        <Dialog />
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
        <ContributionCard />
        <ContributionCard />
        <ContributionCard />
      </Flex>

      <Footer />
    </Container>
  );
}

export default Landing;
