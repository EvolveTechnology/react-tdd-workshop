import React from "react";
import {
  Box,
  Button,
  Card,
  Flex,
  Heading,
  Image,
  Link,
  Text
} from "rebass/styled-components";

import { Label, Input, Slider } from "@rebass/forms";

import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

import Dialog from "@reach/dialog";

import { Footer } from "components/Footer";

import CoffeeCupWithSmile from "assets/coffee_cup_with_smile.png";
import CoffeeCup from "assets/coffee_cup.png";
import CoffeeToGo from "assets/coffee_to_go.png";
import DebitCard from "assets/debit_card.png";
import ReactLogo from "assets/react_logo.png";

import "@reach/dialog/styles.css";

function App() {
  const [cups, setCups] = React.useState(1);
  const handleSliderChange = e => setCups(e.target.value);

  const [showDialog, setShowDialog] = React.useState(false);
  const open = () => setShowDialog(true);
  const close = () => setShowDialog(false);

  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async event => {
    event.preventDefault();
    const result = await stripe.createToken(elements.getElement(CardElement));

    console.log(result);
  };

  const hasCups = cups > 0;
  const enableCheckout = hasCups && stripe;

  return (
    <Box
      width={["100%", "90%"]}
      maxWidth="1024px"
      margin="0 auto"
      bg="background"
    >
      <Flex px={2} py={2} color="white" bg="black" alignItems="center">
        <Text p={2} fontWeight="bold" fontSize="2rem">
          Buy me a coffee
        </Text>
        <Box mx="auto" />
        <Link variant="nav" href="#!" fontSize={2}>
          Log In
        </Link>
      </Flex>

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

        <Button onClick={open} color="white" bg="highlight" fontSize={5}>
          Donate
        </Button>
      </Flex>

      <Dialog aria-label="Donate" isOpen={showDialog} onDismiss={close}>
        <Flex flexDirection="column">
          <Flex flexDirection="column" my={1}>
            <Heading>Log in</Heading>
            <form>
              <Box my={2} sx={{ "> input": { margin: 2 } }}>
                <Label htmlFor="email" fontSize={3}>
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="jane@example.com"
                  fontSize={2}
                  maxWidth="300px"
                  autoComplete="email"
                />
                <Label htmlFor="password" fontSize={3}>
                  Password
                </Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  fontSize={2}
                  maxWidth="300px"
                  placeholder="password"
                  autoComplete="current-password"
                />
              </Box>
            </form>
          </Flex>
          <form onSubmit={handleSubmit}>
            <Heading>Make a contribution</Heading>
            <Flex flexDirection="column" my={1}>
              <Box>
                <Label htmlFor="percent" fontSize={3}>
                  Quantity ({cups})
                </Label>
                <Slider
                  id="percent"
                  name="percent"
                  value={cups}
                  min={0}
                  max={10}
                  onChange={handleSliderChange}
                />
                <Flex flexWrap="wrap" marginTop={2} marginBottom={1}>
                  {Array.from({ length: cups }, (_, index) => (
                    <Image key={index} src={CoffeeCupWithSmile} />
                  ))}
                </Flex>
              </Box>
              <Label htmlFor="percent" my={3} fontSize={3}>
                Pay with Stripe
              </Label>
              <Box maxWidth="400px" margin="0 auto">
                <CardElement
                  options={{
                    style: {
                      base: {
                        fontFamily: "'Inconsolata', monospace",
                        fontSize: "18px"
                      }
                    }
                  }}
                />
                <Label my={1} justifyContent="flex-end" color="#ff0000">
                  This only a demo. Do not use a real card.
                </Label>
              </Box>
              <Button
                onClick={close}
                color="white"
                bg="highlight"
                fontSize={4}
                marginTop={2}
                disabled={!enableCheckout}
                style={{
                  cursor: enableCheckout ? "pointer" : "not-allowed"
                }}
              >
                Checkout
              </Button>
              <Button
                onClick={close}
                color="secondary"
                variant="outline"
                fontSize={4}
                marginTop={2}
                style={{ border: "1px solid" }}
              >
                Cancel
              </Button>
            </Flex>
          </form>
        </Flex>
      </Dialog>

      <Flex px={1} my={2} justifyContent="center">
        <Heading p={2} fontWeight="bold" fontSize="2rem" color="highlight">
          Contributors
        </Heading>
      </Flex>

      <Flex justifyContent="center" alignItems="center" flexDirection="column">
        <Card
          bg="muted"
          color="highlight"
          my={2}
          mx={2}
          width="90%"
          maxWidth="575px"
          borderRadius={8}
          sx={{ width: [320, 375, 425, 600], borderRadius: 8 }}
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
        <Card
          bg="muted"
          color="highlight"
          my={2}
          mx={2}
          width="90%"
          maxWidth="575px"
          borderRadius={8}
          sx={{ width: [320, 375, 425, 600], borderRadius: 8 }}
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
                <p>+40</p>
                <Image src={CoffeeToGo} width="44px" />
              </Box>
            </Flex>
          </Flex>
        </Card>
        <Card
          bg="muted"
          color="highlight"
          my={2}
          mx={2}
          width="90%"
          maxWidth="575px"
          borderRadius={8}
          sx={{ width: [320, 375, 425, 600], borderRadius: 8 }}
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
                <p>+400</p>
                <Image src={CoffeeToGo} width="44px" />
              </Box>
            </Flex>
          </Flex>
        </Card>
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
