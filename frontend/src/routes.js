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

const Routes = () => (
  <BrowserRouter>
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Container>
          <Navbar />
          <Switch>
            <Route exact path="/login" component={SuspenseLogin} />
            <Route path="/" component={Landing} />
          </Switch>
          <Footer />
        </Container>
      </ThemeProvider>
    </ApolloProvider>
  </BrowserRouter>
);

export default Routes;
