"use client";
import { partySize as partySizes, times } from "@/data";
import useAvailabilities from "@/hooks/useAvailabilities";
import { Time, convertToDisplayTime } from "@/utils/convertToDisplayTime";
import { CircularProgress } from "@mui/material";
import { Ground } from "@prisma/client";
import Link from "next/link";
import { useState } from "react";
import DatePicker from "react-datepicker";

const ReservationCard = ({
  grounds,
  openTime,
  closeTime,
  slug,
}: {
  grounds: Ground[];
  openTime: string;
  closeTime: string;
  slug: string;
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [time, setTime] = useState(openTime);
  const [partySize, setPartySize] = useState("10");
  const { data, loading, error, fetchAvailabilities } = useAvailabilities();
  const [day, setDay] = useState(new Date().toISOString().split("T")[0]);

  const handleDateChange = (date: Date | null) => {
    if (date) {
      setDay(date.toISOString().split("T")[0]);
      return setSelectedDate(date);
    }

    setSelectedDate(null);
  };

  const filterTimeWindow = () => {
    const timesWithinWindow: typeof times = [];
    let isWithinWindow = false;

    times.forEach((time) => {
      if (time.time === openTime) {
        isWithinWindow = true;
      }

      if (isWithinWindow) {
        timesWithinWindow.push(time);
      }

      if (time.time === closeTime) {
        isWithinWindow = false;
      }
    });

    return timesWithinWindow;
  };

  const handleClick = () => {
    fetchAvailabilities({
      slug,
      day,
      time,
      partySize,
    });
  };
  return (
    <div className="w-[27%] relative text-reg">
      <div className="fixed w-[15%] bg-white rounded p-3 shadow">
        <div className="text-center border-b pb-2 font-bold">
          <h4 className="mr-7 text-lg">Make a Reservation </h4>
        </div>
        <div className="my-3 flex flex-col">
          <label htmlFor="">Party size</label>
          <select
            name=""
            className="py-3 border-b font-light"
            id=""
            value={partySize}
            onChange={(e) => {
              setPartySize(e.target.value);
            }}
          >
            {partySizes.map((party) => (
              <option key={party.id} value={party.value}>
                {party.label}
              </option>
            ))}
          </select>
        </div>
        <div className="flex justify-between">
          <div className="flex flex-col w-[48%]">
            <label htmlFor="">Date</label>
            <DatePicker
              selected={selectedDate}
              onChange={handleDateChange}
              className="py-3 border-b font-light w-28"
              dateFormat={"dd/MM/yyyy"}
            />
          </div>
          <div className="flex flex-col w-[48%]">
            <label htmlFor="">Time</label>
            <select
              className="py-3 border-b font-light"
              value={time}
              onChange={(e) => {
                setTime(e.target.value);
              }}
            >
              {filterTimeWindow().map((time, index) => (
                <option key={index} value={time.time}>
                  {time.displayTime}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="mt-5">
          <button
            className="bg-red-600 rounded w-full px-4 text-white font-bold h-16"
            onClick={handleClick}
            disabled={loading}
          >
            {loading ? (
              <>
                <CircularProgress color="inherit" />
              </>
            ) : (
              <>Find a Time</>
            )}
          </button>
        </div>
        {data && data.length ? (
          <>
            <div className="mt-4">
              <p className="text-reg">Select a Time</p>
              <div className="flex flex-wrap mt-2">
                {data.map((time, index) => {
                  return time.available ? (
                    <Link
                      href={`/reserve/${slug}?date=${day}T${time.time}&partySize=${partySize}`}
                      className="bg-red-600 cursor-pointer text-white text-center w-24 mr-2 mb-2 rounded p-2"
                      key={index}
                    >
                      <p className="text-sm font-bold">
                        {convertToDisplayTime(time.time as Time)}
                      </p>
                    </Link>
                  ) : (
                    <div
                      className="bg-gray-300 w-24 mr-2 mb-2 p-2 rounded text-red-600 text-center"
                      key={index}
                    >
                      <p className="text-xs font-bold">Not Available</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default ReservationCard;
