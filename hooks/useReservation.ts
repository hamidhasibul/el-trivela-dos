import { Dispatch, SetStateAction, useState } from "react";

export default function useReservation() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createReservation = async ({
    slug,
    day,
    time,
    partySize,
    firstName,
    lastName,
    phoneNumber,
    email,
    requests,
    setDidBook,
  }: {
    slug: string;
    day: string;
    time: string;
    partySize: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    requests: string;
    setDidBook: Dispatch<SetStateAction<boolean>>;
  }) => {
    setLoading(true);

    console.log(firstName, lastName, phoneNumber, email, requests);

    try {
      const response = await fetch(
        `/api/turf/${slug}/reserve?day=${day}&time=${time}&partySize=${partySize}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            bookerFirstName: firstName,
            bookerLastName: lastName,
            bookerPhone: phoneNumber,
            bookerEmail: email,
            bookerRequest: requests,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();

        setLoading(false);
        setDidBook(true);
        return data;
      } else {
        const errorData = await response.json();
        setLoading(false);
        setError(errorData.message);
      }
    } catch (error: any) {
      setLoading(false);
      setError(error);
    }
  };

  return { loading, error, createReservation };
}
