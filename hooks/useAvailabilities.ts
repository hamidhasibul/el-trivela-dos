import { useState } from "react";

export default function useAvailabilities() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState<
    { time: string; available: boolean }[] | null
  >(null);

  const fetchAvailabilities = async ({
    slug,
    day,
    time,
    partySize,
  }: {
    slug: string;
    day: string;
    time: string;
    partySize: string;
  }) => {
    setLoading(true);

    try {
      const response = await fetch(
        `http://localhost:3000/api/turf/${slug}/availability?day=${day}&time=${time}&partySize=${partySize}`
      );

      if (response.ok) {
        const data = await response.json();

        setLoading(false);
        setData(data);
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

  return { data, loading, error, fetchAvailabilities };
}
