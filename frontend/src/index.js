import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider } from "styled-components";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import theme from "styles/theme";
import GlobalStyle from "styles/global";

import * as serviceWorker from "./serviceWorker";
import Routes from "routes";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

ReactDOM.render(
  <Elements
    stripe={stripePromise}
    options={{
      fonts: [
        {
          family: "Inconsolata",
          src:
            "url('https://fonts.gstatic.com/s/inconsolata/v18/QldKNThLqRwH-OJ1UHjlKGlZ5qg.woff2') format('woff2')",
          style: "normal"
        }
      ]
    }}
  >
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Routes />
    </ThemeProvider>
  </Elements>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
