"use client";

import useReservation from "@/hooks/useReservation";
import { CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";

const ReservationForm = ({
  slug,
  date,
  partySize,
}: {
  slug: string;
  date: string;
  partySize: string;
}) => {
  const [inputs, setInputs] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    requests: "",
  });

  const [disabled, setDisabled] = useState(true);
  const [day, time] = date.split("T");
  const [didBook, setDidBook] = useState(false);

  const { error, loading, createReservation } = useReservation();

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const handleClick = async () => {
    const booking = await createReservation({
      slug,
      day,
      time,
      partySize,
      firstName: inputs.firstName,
      lastName: inputs.lastName,
      phoneNumber: inputs.phoneNumber,
      email: inputs.email,
      requests: inputs.requests,
      setDidBook,
    });
  };

  useEffect(() => {
    if (
      inputs.firstName &&
      inputs.lastName &&
      inputs.phoneNumber &&
      inputs.email
    ) {
      return setDisabled(false);
    }
  }, [inputs]);
  return (
    <div className="mt-10 flex flex-wrap justify-between w-[660px]">
      {didBook ? (
        <>
          <div className="">
            <h1>Booked</h1>
          </div>
        </>
      ) : (
        <>
          <input
            type="text"
            className="border rounded p-3 w-80 mb-4"
            placeholder="First name"
            name="firstName"
            value={inputs.firstName}
            onChange={handleChangeInput}
          />
          <input
            type="text"
            className="border rounded p-3 w-80 mb-4"
            placeholder="Last name"
            name="lastName"
            value={inputs.lastName}
            onChange={handleChangeInput}
          />
          <input
            type="text"
            className="border rounded p-3 w-80 mb-4"
            placeholder="Phone number"
            name="phoneNumber"
            value={inputs.phoneNumber}
            onChange={handleChangeInput}
          />
          <input
            type="text"
            className="border rounded p-3 w-80 mb-4"
            placeholder="Email"
            name="email"
            value={inputs.email}
            onChange={handleChangeInput}
          />
          <input
            type="text"
            className="border rounded p-3 w-80 mb-4"
            placeholder="Requests (optional)"
            name="requests"
            value={inputs.requests}
            onChange={handleChangeInput}
          />
          <button
            disabled={disabled || loading}
            className="bg-red-600 w-full p-3 text-white font-bold rounded disabled:bg-gray-300"
            onClick={handleClick}
          >
            {loading ? (
              <CircularProgress color="inherit" />
            ) : (
              "Complete reservation"
            )}
          </button>
          <p className="mt-4 text-sm">
            By clicking “Complete reservation” you agree to the El-Trivela Terms
            of Use and Privacy Policy. Standard text message rates may apply.
            You may opt out of receiving text messages at any time.
          </p>
        </>
      )}
    </div>
  );
};

export default ReservationForm;
