import React from "react";
import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Text
} from "rebass/styled-components";

import Dialog from "@reach/dialog";

import { Checkout } from "components/Checkout";
import { ContributionCard } from "components/ContributionCard";
import { Footer } from "components/Footer";
import { Login } from "components/Login";
import { Navbar } from "components/Navbar";

import CoffeeCup from "assets/coffee_cup.png";
import CoffeeToGo from "assets/coffee_to_go.png";
import DebitCard from "assets/debit_card.png";
import ReactLogo from "assets/react_logo.png";

import "@reach/dialog/styles.css";

function App() {
  const [showDialog, setShowDialog] = React.useState(false);
  const open = () => setShowDialog(true);
  const close = () => setShowDialog(false);

  return (
    <Box
      width={["100%", "90%"]}
      maxWidth="1024px"
      margin="0 auto"
      bg="background"
    >
      <Navbar />
      <Flex px={2} py={4} alignItems="center" flexDirection="column">
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
        <Image
          src={CoffeeCup}
          my={1}
          sx={{
            width: ["40%", "30%", "25%", "20%", "15%"],
            cursor: "pointer"
          }}
          onClick={open}
        />

        <Button
          onClick={open}
          color="white"
          bg="highlight"
          fontSize={5}
          data-testid="donate-button"
        >
          Donate
        </Button>
      </Flex>

      <Dialog aria-label="Donate" isOpen={showDialog} onDismiss={close}>
        <Flex flexDirection="column">
          <Login />
          <Checkout onCancel={close} />
        </Flex>
      </Dialog>

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
      <Flex py={4} justifyContent="center">
        <Image src={DebitCard} />
        <Image src={CoffeeToGo} />
        <Image src={ReactLogo} width="64px" />
      </Flex>
      <Footer />
    </Box>
  );
}

export default App;
