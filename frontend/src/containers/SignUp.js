import React from "react";
import { NavLink, Redirect } from "react-router-dom";
import { Text } from "rebass/styled-components";
import { SignUpForm } from "components/SignUpForm";
import { useMutation } from "@apollo/react-hooks";
import { CREATE_USER } from "graphql/mutations";
import { useIdentity } from "providers/Auth";
import { IDENTITY } from "graphql/queries";

export function SignUp({ history }) {
  const [error, setError] = React.useState(null);

  const [signUp, { loading: createUserLoading }] = useMutation(CREATE_USER, {
    onCompleted: () => history.push("/"),
    onError: error => setError(error),
    refetchQueries: [{ query: IDENTITY }]
  });

  React.useEffect(() => {
    if (createUserLoading) {
      setError(null);
    }
  }, [createUserLoading]);

  const onSuccess = ({ name, email, password }) => {
    signUp({ variables: { name, email, password } });
  };

  const onError = error => setError(error);

  const { id } = useIdentity();

  if (id) {
    return <Redirect to="/" />;
  }
  return (
    <>
      <SignUpForm error={error} onSuccess={onSuccess} onError={onError} />
      <Text
        variant="nav"
        my={4}
        fontSize={2}
        fontWeight="bold"
        textAlign="center"
        style={{ textDecoration: "underline" }}
      >
        <NavLink to="/" data-testid="signup-back-home">
          Home
        </NavLink>
      </Text>
    </>
  );
}

export default SignUp;
