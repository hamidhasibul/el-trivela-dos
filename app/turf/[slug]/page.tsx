import Navbar from "@/app/components/Navbar";
import Link from "next/link";
import React from "react";
import Header from "./components/Header";
import TurfNavbar from "./components/TurfNavbar";
import Title from "./components/Title";
import Rating from "./components/Rating";
import Description from "./components/Description";
import Images from "./components/Images";
import Reviews from "./components/Reviews";
import ReservationCard from "./components/ReservationCard";

const TurfDetailsPage = () => {
  return (
    <main className="bg-gray-100 min-h-screen">
      <main className="max-w-screen-2xl m-auto bg-white">
        {/* NAVBAR */}
        <Navbar />
        {/* NAVBAR */}
        {/* HEADER */}
        <Header />
        {/* HEADER */}
        {/* DESCRIPTION PORTION */}
        <div className="flex m-auto w-2/3 justify-between items-start 0 -mt-11">
          <div className="bg-white w-[70%] rounded p-3 shadow">
            {/* TURF NAVBAR */}
            <TurfNavbar />
            {/* TURF NAVBAR */}
            {/* TITLE */}
            <Title />
            {/* TITLE */}
            {/* RATING */}
            <Rating />
            {/* RATING */}
            {/* DESCRIPTION */}
            <Description />
            {/* DESCRIPTION */}
            {/* IMAGES */}
            <Images />
            {/* IMAGES */}
            {/* REVIEWS */}
            <Reviews />
            {/* REVIEWS */}
          </div>
          {/* DESCRIPTION PORTION */}

          {/* RESERVATION CARD PORTION */}
          <ReservationCard />
        </div>

        {/* RESERVATION CARD PORTION */}
      </main>
    </main>
  );
};

export default TurfDetailsPage;
