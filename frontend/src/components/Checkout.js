import React from "react";
import { Box, Button, Flex, Heading, Image } from "rebass/styled-components";
import { Label, Slider } from "@rebass/forms";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

import CoffeeCupWithSmile from "assets/coffee_cup_with_smile.png";

export function Checkout({ onCancel }) {
  const [cups, setCups] = React.useState(1);
  const handleSliderChange = e => setCups(e.target.value);

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
    <form onSubmit={handleSubmit} data-testid="contribute-form">
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
          onClick={onCancel}
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
          onClick={onCancel}
          color="secondary"
          variant="outline"
          fontSize={4}
          marginTop={2}
          style={{ border: "1px solid" }}
          data-testid="cancel-checkout"
        >
          Cancel
        </Button>
      </Flex>
    </form>
  );
}
