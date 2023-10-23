import React from "react";

import Header from "./components/Header";
import SideBar from "./components/SideBar";
import TurfCard from "./components/TurfCard";

const SearchPage = () => {
  return (
    <>
      <Header />
      <div className="flex py-4 m-auto w-2/3 justify-between items-start">
        {/* SEARCH SIDE BAR */}
        <SideBar />
        {/* SEARCH SIDE BAR */}
        <TurfCard />
      </div>
    </>
  );
};

export default SearchPage;
