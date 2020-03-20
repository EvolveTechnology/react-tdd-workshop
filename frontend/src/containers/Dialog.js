import React from "react";
import { Button, Flex, Image } from "rebass/styled-components";
import { Dialog as ReachDialog } from "@reach/dialog";
import { useMutation } from "@apollo/react-hooks";

import { Checkout } from "components/Checkout";
import { LoginForm } from "components/LoginForm";
import { WithoutIdentity, Private } from "providers/Auth";

import CoffeeCup from "assets/coffee_cup.png";
import { CREATE_CONTRIBUTION } from "graphql/mutations";
import { PUBLIC_CONTRIBUTIONS } from "graphql/queries";

export function Dialog() {
  const [showDialog, setShowDialog] = React.useState(false);
  const [error, setError] = React.useState(null);

  const open = () => setShowDialog(true);
  const close = () => setShowDialog(false);

  const [orderContribution, { loading: orderLoading }] = useMutation(
    CREATE_CONTRIBUTION,
    {
      onCompleted: close,
      onError: error => setError(error),
      refetchQueries: [{ query: PUBLIC_CONTRIBUTIONS }]
    }
  );

  React.useEffect(() => {
    if (orderLoading) {
      setError(null);
    }
  }, [orderLoading]);

  const onSuccess = ({ token, cups, message = null, _private = false }) => {
    orderContribution({
      variables: { token, qty: parseInt(cups), message, private: _private }
    });
  };

  const onError = error => setError(error);

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
          <WithoutIdentity>
            <LoginForm onSuccess={console.log} onError={console.log} />
          </WithoutIdentity>
          <Private>
            <Checkout
              onSuccess={onSuccess}
              onError={onError}
              onCancel={close}
              error={error}
            />
          </Private>
        </Flex>
      </ReachDialog>
    </>
  );
}
