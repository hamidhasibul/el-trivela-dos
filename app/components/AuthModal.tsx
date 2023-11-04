"use client";

import { useContext, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import AuthModalInputs from "./AuthModalInputs";
import useAuth from "@/hooks/useAuth";
import { AuthenticationContext } from "../context/AuthContext";
import { CircularProgress } from "@mui/material";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",

  boxShadow: 24,
  p: 4,
};

export default function AuthModal({ isSignin }: { isSignin: boolean }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { signin } = useAuth();
  const { loading, error, data } = useContext(AuthenticationContext);

  const [inputs, setInputs] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    city: "",
    password: "",
  });

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setInputs({ ...inputs, [name]: value });
  };

  const renderContent = (signinContent: string, signupContent: string) => {
    return isSignin ? signinContent : signupContent;
  };

  const [disabled, setDisabled] = useState(true);

  const handleClick = () => {
    if (isSignin) {
      signin({ email: inputs.email, password: inputs.password });
    }
  };

  useEffect(() => {
    if (isSignin) {
      if (inputs.email && inputs.password) {
        return setDisabled(false);
      }
    } else {
      if (
        inputs.email &&
        inputs.firstName &&
        inputs.lastName &&
        inputs.phone &&
        inputs.city &&
        inputs.password
      ) {
        return setDisabled(false);
      }
    }

    setDisabled(true);
  }, [inputs]);

  return (
    <div>
      <button
        className={renderContent(
          "bg-blue-400 text-white border p-1 px-4 rounded mr-3",
          "border p-1 px-4 rounded"
        )}
        onClick={handleOpen}
      >
        {renderContent("Sign in", "Sign up")}
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {loading ? (
            <>
              <div className="p-2 h-[500px] flex justify-center items-center">
                <CircularProgress />
              </div>
            </>
          ) : (
            <>
              <div className="p-2 h-[500px]">
                <div className="uppercase font-bold text-center pb-2 border-b mb-2">
                  <p className="text-sm">
                    {renderContent("Sign in", "Create Account")}
                  </p>
                </div>
                <div className="m-auto">
                  <h2 className="text-xl font-light text-center">
                    {renderContent(
                      "Log into your account",
                      "Create your el-trivela account"
                    )}
                  </h2>
                  <AuthModalInputs
                    inputs={inputs}
                    handleChangeInput={handleChangeInput}
                    isSignin={isSignin}
                  />
                  <button
                    className="uppercase bg-red-600 w-full text-white p-3 rounded text-sm mb-5 disabled:bg-gray-500"
                    disabled={disabled}
                    onClick={handleClick}
                  >
                    {renderContent("Sign in", "Create Account")}
                  </button>
                </div>
              </div>
            </>
          )}
        </Box>
      </Modal>
    </div>
  );
}
