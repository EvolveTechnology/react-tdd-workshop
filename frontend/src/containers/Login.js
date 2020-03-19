import React from "react";
import { NavLink, Redirect } from "react-router-dom";
import { Text } from "rebass/styled-components";
import { LoginForm } from "components/LoginForm";
import { useMutation } from "@apollo/react-hooks";
import { SIGN_IN } from "graphql/mutations";
import { useIdentity } from "providers/Auth";
import { IDENTITY } from "graphql/queries";

export function Login({ history }) {
  const [error, setError] = React.useState(null);

  const [logIn, { loading: logInLoading }] = useMutation(SIGN_IN, {
    onCompleted: () => history.push("/"),
    onError: error => setError(error),
    refetchQueries: [{ query: IDENTITY }]
  });

  React.useEffect(() => {
    if (logInLoading) {
      setError(null);
    }
  }, [logInLoading]);

  const onSuccess = ({ email, password }) => {
    logIn({ variables: { email, password } });
  };

  const onError = error => setError(error);

  const { id } = useIdentity();

  if (id) {
    return <Redirect to="/" />;
  }
  return (
    <>
      <LoginForm onSuccess={onSuccess} onError={onError} error={error} />
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

export default Login;
