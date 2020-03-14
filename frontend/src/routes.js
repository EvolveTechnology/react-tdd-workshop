import React from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import { Container } from "components/Container";
import { Navbar } from "components/Navbar";

import Landing from "containers/Landing";
import { Footer } from "components/Footer";

const Routes = () => (
  <BrowserRouter>
    <Container>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Landing} />
      </Switch>
      <Footer />
    </Container>
  </BrowserRouter>
);

export default Routes;
