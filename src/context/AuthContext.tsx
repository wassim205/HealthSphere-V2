import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { fetchProfile, login, register } from "../services/api";

const AUTH_TOKEN_KEY = "healthsphere_auth_token";

interface AuthUser {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

interface AuthContextValue {
  token: string | null;
  user: AuthUser | null;
  isBootstrapping: boolean;
  isSubmitting: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (name: string, email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isBootstrapping, setIsBootstrapping] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const bootstrap = async () => {
      try {
        const storedToken = await AsyncStorage.getItem(AUTH_TOKEN_KEY);
        if (!storedToken) return;

        const profile = await fetchProfile(storedToken);
        setToken(storedToken);
        setUser(profile);
      } catch {
        await AsyncStorage.removeItem(AUTH_TOKEN_KEY);
        setToken(null);
        setUser(null);
      } finally {
        setIsBootstrapping(false);
      }
    };

    void bootstrap();
  }, []);

  const signIn = async (email: string, password: string) => {
    setIsSubmitting(true);
    try {
      const result = await login(email, password);
      setToken(result.token);
      setUser(result.user);
      await AsyncStorage.setItem(AUTH_TOKEN_KEY, result.token);
    } finally {
      setIsSubmitting(false);
    }
  };

  const signUp = async (name: string, email: string, password: string) => {
    setIsSubmitting(true);
    try {
      const result = await register(name, email, password);
      setToken(result.token);
      setUser(result.user);
      await AsyncStorage.setItem(AUTH_TOKEN_KEY, result.token);
    } finally {
      setIsSubmitting(false);
    }
  };

  const signOut = async () => {
    setToken(null);
    setUser(null);
    await AsyncStorage.removeItem(AUTH_TOKEN_KEY);
  };

  const value = useMemo(
    () => ({
      token,
      user,
      isBootstrapping,
      isSubmitting,
      signIn,
      signUp,
      signOut,
    }),
    [token, user, isBootstrapping, isSubmitting]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}

