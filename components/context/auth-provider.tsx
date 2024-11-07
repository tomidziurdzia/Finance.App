"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { User } from "interfaces/userInterface";
import { getCurrentUser, getToken } from "app/actions/auth";
import { SWRConfig } from "swr";
import fetcher from "lib/fetcher";

interface Session {
  token: string | null;
}

interface AuthContextType {
  session: Session | null;
  user: User | null;
  loading: boolean;
  error: string | null;
  setSession: (session: Session | null) => void;
  setUser: (user: User | null) => void;
  clearSession: () => void;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    checkUserSession();
  }, []);

  async function checkUserSession() {
    try {
      const [currentUser, token] = await Promise.all([
        getCurrentUser(),
        getToken(),
      ]);
      setSession({ token });
      setUser(currentUser);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setError("Session check failed");
      setSession(null);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  const clearSession = () => {
    setSession(null);
    setUser(null);
  };
  const clearError = () => setError(null);

  const value = {
    session,
    user,
    loading,
    error,
    setSession,
    setUser,
    clearSession,
    clearError,
  };

  return (
    <AuthContext.Provider value={value}>
      <SWRConfig value={{ fetcher }}>{children}</SWRConfig>
    </AuthContext.Provider>
  );
}

export function useUser() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
