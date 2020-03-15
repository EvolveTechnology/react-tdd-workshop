import React from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";

import { ApolloProvider } from "@apollo/react-hooks";
import { ThemeProvider } from "styled-components";

import theme from "styles/theme";
import GlobalStyle from "styles/global";

import { Container } from "components/Container";
import { Footer } from "components/Footer";
import { Navbar } from "components/Navbar";

import client from "client";

import Landing from "containers/Landing";
import SignUp from "containers/SignUp";
import Request from "containers/Request";
import Reset from "containers/Reset";

const LazyLogin = React.lazy(() =>
  import(/* webpackChunkName:"login"*/ "./containers/Login")
);

function SuspenseLogin(props) {
  return (
    <React.Suspense fallback={null}>
      <LazyLogin {...props} />
    </React.Suspense>
  );
}

export const App = () => (
  <ApolloProvider client={client}>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Container>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/login" component={SuspenseLogin} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/request" component={Request} />
          <Route exact path="/reset" component={Reset} />
        </Switch>
        <Footer />
      </Container>
    </ThemeProvider>
  </ApolloProvider>
);

export const Root = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
