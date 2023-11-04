import { AuthenticationContext } from "@/app/context/AuthContext";
import { useContext } from "react";

const useAuth = () => {
  const { data, loading, error, setAuthState } = useContext(
    AuthenticationContext
  );

  const signin = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
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
        setAuthState({
          loading: false,
          error: null,
          data: null,
        });

        const data = await response.json();

        console.log(data);
      } else {
        const error = await response.json();
        throw new Error(`${error.message}`);
      }
    } catch (error: any) {
      console.error(error);
      setAuthState({
        loading: false,
        error: error,
        data: null,
      });
    }
  };

  const signup = async () => {};

  return { signin, signup };
};

export default useAuth;
