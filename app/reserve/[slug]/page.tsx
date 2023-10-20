import Navbar from "@/app/components/Navbar";
import React from "react";
import Header from "./components/Header";
import ReservationForm from "./components/ReservationForm";

const ReservationPage = () => {
  return (
    <main className="max-w-screen-2xl m-auto bg-white">
      {/* NAVBAR */}
      <Navbar />
      {/* NAVBAR END */}
      <div className="border-t h-screen">
        <div className="py-9 w-3/5 m-auto">
          {/* HEADER */}
          <Header />
          {/* HEADER */}

          <ReservationForm />
          {/* FORM */}
        </div>
      </div>
    </main>
  );
};

export default ReservationPage;
