import { useCallback, useEffect, useMemo, useState } from "react";
import { AuthContext } from "./authContextValue";
import {
  clearAuthSession,
  getStoredAuthSession,
  saveAuthSession,
} from "../utils/authStorage";

export function AuthProvider({ children }) {
  const [session, setSession] = useState(() => getStoredAuthSession());

  useEffect(() => {
    const syncSession = () => setSession(getStoredAuthSession());

    window.addEventListener("storage", syncSession);
    window.addEventListener("auth-changed", syncSession);

    return () => {
      window.removeEventListener("storage", syncSession);
      window.removeEventListener("auth-changed", syncSession);
    };
  }, []);

  const setAuthSession = useCallback((response) => {
    const nextSession = saveAuthSession(response);
    setSession(nextSession);
    window.dispatchEvent(new Event("auth-changed"));
    return nextSession;
  }, []);

  const clearAuth = useCallback(() => {
    clearAuthSession();
    setSession({ token: "", user: null });
    window.dispatchEvent(new Event("auth-changed"));
  }, []);

  const value = useMemo(
    () => ({
      clearAuth,
      isAuthenticated: Boolean(session.token),
      setAuthSession,
      token: session.token,
      user: session.user,
    }),
    [clearAuth, session.token, session.user, setAuthSession],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
