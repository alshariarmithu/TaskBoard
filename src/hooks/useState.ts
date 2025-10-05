"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";

type User = {
  name: string;
  email: string;
};

export function useAuthState() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const loadFromCache = useCallback(() => {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (token && userData) {
      try {
        const parsedUser: User = JSON.parse(userData);
        setUser(parsedUser);
        setIsAuthenticated(true);
        return true;
      } catch {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        sessionStorage.removeItem("token");
      }
    }
    return false;
  }, []);

  const login = useCallback(
    (userData: User, token: string, remember: boolean = false) => {
      const storage = remember ? localStorage : sessionStorage;

      storage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(userData));

      setUser(userData);
      setIsAuthenticated(true);
      setError(null);

      router.push("/home");
    },
    [router]
  );

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsAuthenticated(false);
    setUser(null);
    router.push("/login");
  }, [router]);

  return {
    isAuthenticated,
    user,
    isLoading,
    error,
    login,
    logout,
  };
}
