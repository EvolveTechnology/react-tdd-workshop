import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { IDENTITY } from "graphql/queries";

const AuthCtx = React.createContext();

export function AuthProvider({ children }) {
  const { data, loading } = useQuery(IDENTITY);

  const { id = "", name = "", permissions = null, email = "" } =
    data?.whoAmI ?? {};

  const value = React.useMemo(
    () => ({ id, name, permissions, email, loading }),
    [id, name, permissions, email, loading]
  );

  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
}

export function usePermissions() {
  return React.useContext(AuthCtx).permissions ?? [];
}

export function useIdentity() {
  const { id, name, permissions, email, loading } = React.useContext(AuthCtx);

  return { id, name, permissions, email, loading };
}

export function Private({ children }) {
  const { id } = useIdentity();

  if (!id) {
    return null;
  }
  return <>{children}</>;
}

export function WithoutIdentity({ children }) {
  const { id } = useIdentity();

  if (id) {
    return null;
  }

  return <>{children}</>;
}
