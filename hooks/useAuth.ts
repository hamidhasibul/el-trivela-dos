import { AuthenticationContext } from "@/app/context/AuthContext";
import { deleteCookie, getCookie } from "cookies-next";
import { useContext } from "react";

const useAuth = () => {
  const { data, loading, error, setAuthState } = useContext(
    AuthenticationContext
  );

  const signin = async (
    {
      email,
      password,
    }: {
      email: string;
      password: string;
    },
    handleClose: () => void
  ) => {
    setAuthState({
      loading: true,
      error: null,
      data: null,
    });

    try {
      const response = await fetch("http://localhost:3000/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      if (response.ok) {
        const data = await response.json();
        setAuthState({
          loading: false,
          error: null,
          data: data,
        });

        handleClose();
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

  const signup = async (
    {
      email,
      password,
      firstName,
      lastName,
      city,
      phone,
    }: {
      email: string;
      password: string;
      firstName: string;
      lastName: string;
      city: string;
      phone: string;
    },
    handleClose: () => void
  ) => {
    setAuthState({
      loading: true,
      error: null,
      data: null,
    });

    try {
      const response = await fetch("http://localhost:3000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          firstName,
          lastName,
          city,
          phone,
        }),
      });
      if (response.ok) {
        const data = await response.json();
        setAuthState({
          loading: false,
          error: null,
          data: data,
        });

        handleClose();
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

  const signout = () => {
    deleteCookie("jwt");
    setAuthState({
      loading: false,
      error: null,
      data: null,
    });
  };

  return { signin, signup, signout };
};

export default useAuth;
