"use client";
import { partySize, times } from "@/data";
import { Ground } from "@prisma/client";
import { time } from "console";
import { useState } from "react";
import DatePicker from "react-datepicker";

const ReservationCard = ({
  grounds,
  openTime,
  closeTime,
}: {
  grounds: Ground[];
  openTime: string;
  closeTime: string;
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  const handleDateChange = (date: Date | null) => {
    if (date) {
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
  return (
    <div className="w-[27%] relative text-reg">
      <div className="fixed w-[15%] bg-white rounded p-3 shadow">
        <div className="text-center border-b pb-2 font-bold">
          <h4 className="mr-7 text-lg">Make a Reservation</h4>
        </div>
        <div className="my-3 flex flex-col">
          <label htmlFor="">Party size</label>
          <select name="" className="py-3 border-b font-light" id="">
            {partySize.map((party) => (
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
            {/* <input type="text" className="py-3 border-b font-light w-28" /> */}
          </div>
          <div className="flex flex-col w-[48%]">
            <label htmlFor="">Time</label>
            <select className="py-3 border-b font-light">
              {filterTimeWindow().map((time, index) => (
                <option key={index} value={time.time}>
                  {time.displayTime}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="mt-5">
          <button className="bg-red-600 rounded w-full px-4 text-white font-bold h-16">
            Find a Time
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReservationCard;
