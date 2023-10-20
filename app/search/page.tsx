import Link from "next/link";
import React from "react";
import Navbar from "../components/Navbar";
import Header from "./components/Header";
import SideBar from "./components/SideBar";
import TurfCard from "./components/TurfCard";

const SearchPage = () => {
  return (
    <main className="bg-gray-100 min-h-screen w-screen">
      <main className="max-w-screen-2xl m-auto bg-white">
        {/* NAVBAR */}
        <Navbar />
        {/* HEADER */}
        <Header />

        {/* HEADER */}
        <div className="flex py-4 m-auto w-2/3 justify-between items-start">
          {/* SEARCH SIDE BAR */}
          <SideBar />
          {/* SEARCH SIDE BAR */}
          <TurfCard />
        </div>
      </main>
    </main>
  );
};

export default SearchPage;
