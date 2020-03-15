import React from "react";

const LazyLogin = React.lazy(() =>
  import(
    /* webpackChunkName: "login", webpackPrefetch: true */ "./containers/Login"
  )
);

const LazySignUp = React.lazy(() =>
  import(/* webpackChunkName: "signup"*/ "./containers/SignUp")
);

const LazyRequest = React.lazy(() =>
  import(/* webpackChunkName: "request"*/ "./containers/Request")
);

const LazyReset = React.lazy(() =>
  import(/* webpackChunkName: "reset"*/ "./containers/Reset")
);

export function SuspenseLogin(props) {
  return (
    <React.Suspense fallback={null}>
      <LazyLogin {...props} />
    </React.Suspense>
  );
}

export function SuspenseSignUp(props) {
  return (
    <React.Suspense fallback={null}>
      <LazySignUp {...props} />
    </React.Suspense>
  );
}
export function SuspenseRequest(props) {
  return (
    <React.Suspense fallback={null}>
      <LazyRequest {...props} />
    </React.Suspense>
  );
}
export function SuspenseReset(props) {
  return (
    <React.Suspense fallback={null}>
      <LazyReset {...props} />
    </React.Suspense>
  );
}
