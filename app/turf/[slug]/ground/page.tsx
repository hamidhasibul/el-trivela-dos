import Navbar from "@/app/components/Navbar";
import Link from "next/link";
import React from "react";
import Header from "../components/Header";
import TurfNavbar from "../components/TurfNavbar";
import GroundCard from "./components/GroundCard";

const TurfGroundPage = () => {
  return (
    <main className="bg-gray-100 min-h-screen w-screen">
      <main className="max-w-screen-2xl m-auto bg-white">
        {/* NAVBAR */}
        <Navbar />
        {/* NAVBAR */} {/* HEADER */}
        <Header />
        {/* HEADER */} {/* DESCRIPTION PORTION */}
        <div className="flex m-auto w-2/3 justify-between items-start 0 -mt-11">
          <div className="bg-white w-[100%] rounded p-3 shadow">
            {/* RESAURANT NAVBAR */}
            <TurfNavbar />
            {/* RESAURANT NAVBAR */}
            {/* Grounds */}
            <main className="bg-white mt-5">
              <div>
                <div className="mt-4 pb-1 mb-1">
                  <h1 className="font-bold text-4xl">Grounds</h1>
                </div>
                <div className="flex flex-wrap justify-between">
                  {/* GROUND CARD */}
                  <GroundCard />
                  {/* GROUND CARD */}
                </div>
              </div>
            </main>
            {/* Grounds */}
          </div>
        </div>
        {/* DESCRIPTION PORTION */}
      </main>
    </main>
  );
};

export default TurfGroundPage;
