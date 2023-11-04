"use client";

import { getCookie } from "cookies-next";
import { useState, createContext, useEffect } from "react";

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city: string;
}

interface State {
  loading: boolean;
  data: User | null;
  error: string | null;
}

interface AuthState extends State {
  setAuthState: React.Dispatch<React.SetStateAction<State>>;
}

export const AuthenticationContext = createContext<AuthState>({
  loading: false,
  data: null,
  error: null,
  setAuthState: () => {},
});

export const AuthContext = ({ children }: { children: React.ReactNode }) => {
  const [authState, setAuthState] = useState<State>({
    loading: true,
    data: null,
    error: null,
  });

  const fetchUser = async () => {
    setAuthState({
      loading: true,
      error: null,
      data: null,
    });
    try {
      const jwt = getCookie("jwt");

      if (!jwt) {
        return setAuthState({
          loading: false,
          error: null,
          data: null,
        });
      }

      const response = await fetch(`http://localhost:3000/api/auth/me`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });

      if (response.ok) {
        const data = await response.json();

        setAuthState({
          loading: false,
          error: null,
          data: data,
        });
      } else {
        const errorData = await response.json();

        setAuthState({
          loading: false,
          error: errorData.message,
          data: null,
        });
      }
    } catch (error: any) {
      setAuthState({
        loading: false,
        error: error,
        data: null,
      });
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <AuthenticationContext.Provider value={{ ...authState, setAuthState }}>
      {children}
    </AuthenticationContext.Provider>
  );
};
