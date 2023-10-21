import TurfNavbar from "./components/TurfNavbar";
import Title from "./components/Title";
import Rating from "./components/Rating";
import Description from "./components/Description";
import Images from "./components/Images";
import Reviews from "./components/Reviews";
import ReservationCard from "./components/ReservationCard";

const TurfDetailsPage = () => {
  return (
    <>
      <div className="bg-white w-[70%] rounded p-3 shadow">
        <TurfNavbar />

        <Title />

        <Rating />

        <Description />

        <Images />

        <Reviews />
      </div>
      {/* DESCRIPTION PORTION */}

      {/* RESERVATION CARD PORTION */}
      <ReservationCard />
    </>
  );
};

export default TurfDetailsPage;
