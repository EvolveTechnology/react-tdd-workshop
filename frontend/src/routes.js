import React from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";

import { ApolloProvider } from "@apollo/react-hooks";
import { ThemeProvider } from "styled-components";

import theme from "styles/theme";
import GlobalStyle from "styles/global";

import { Container } from "components/Container";
import { Footer } from "components/Footer";
import { Navbar } from "components/Navbar";

import apolloClient from "apolloClient";

import Landing from "containers/Landing";

import {
  SuspenseLogin,
  SuspenseSignUp,
  SuspenseRequest,
  SuspenseReset
} from "loadables";

export const App = () => (
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    <Container>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/login" component={SuspenseLogin} />
        <Route exact path="/signup" component={SuspenseSignUp} />
        <Route exact path="/request" component={SuspenseRequest} />
        <Route exact path="/reset" component={SuspenseReset} />
      </Switch>
      <Footer />
    </Container>
  </ThemeProvider>
);

export const Root = () => (
  <BrowserRouter>
    <ApolloProvider client={apolloClient}>
      <App />
    </ApolloProvider>
  </BrowserRouter>
);
