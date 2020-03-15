import React from "react";
import { Button, Flex, Image } from "rebass/styled-components";

import { Dialog as ReachDialog } from "@reach/dialog";

import { Checkout } from "components/Checkout";
import { LoginForm } from "components/LoginForm";

import CoffeeCup from "assets/coffee_cup.png";

export function Dialog() {
  const [showDialog, setShowDialog] = React.useState(false);
  const open = () => setShowDialog(true);
  const close = () => setShowDialog(false);

  return (
    <>
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
      <ReachDialog
        aria-label="Donate"
        isOpen={showDialog}
        onDismiss={close}
        data-testid="donate-dialog"
      >
        <Flex flexDirection="column">
          <LoginForm onSuccess={console.log} onError={console.log} />
          <Checkout
            onSuccess={console.log}
            onError={console.log}
            onCancel={close}
          />
        </Flex>
      </ReachDialog>
    </>
  );
}
