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

import { AuthProvider } from "providers/Auth";
import Landing from "containers/Landing";

import {
  SuspenseLogin,
  SuspenseSignUp,
  SuspenseRequest,
  SuspenseReset,
  SuspenseMyContributions,
  SuspenseAdmin
} from "loadables";

export const App = () => (
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    <Container>
      <AuthProvider>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route
            exact
            path="/mycontributions"
            component={SuspenseMyContributions}
          />
          <Route exact path="/login" component={SuspenseLogin} />
          <Route exact path="/signup" component={SuspenseSignUp} />
          <Route exact path="/request" component={SuspenseRequest} />
          <Route exact path="/reset" component={SuspenseReset} />
          <Route exact path="/admin" component={SuspenseAdmin} />
        </Switch>
      </AuthProvider>
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
