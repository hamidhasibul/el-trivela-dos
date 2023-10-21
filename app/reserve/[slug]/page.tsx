import React from "react";
import Header from "./components/Header";
import ReservationForm from "./components/ReservationForm";

const ReservationPage = () => {
  return (
    <>
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
    </>
  );
};

export default ReservationPage;
