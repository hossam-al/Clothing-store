import { createContext, useContext } from "react";

export const AuthContext = createContext(null);

export function useAuth() {
  return (
    useContext(AuthContext) || {
      clearAuth: () => {},
      isAuthenticated: false,
      setAuthSession: () => ({ token: "", user: null }),
      token: "",
      user: null,
    }
  );
}
