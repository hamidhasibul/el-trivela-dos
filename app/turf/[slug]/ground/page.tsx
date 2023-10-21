import TurfNavbar from "../components/TurfNavbar";
import GroundCard from "./components/GroundCard";

const TurfGroundPage = () => {
  return (
    <>
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

      {/* DESCRIPTION PORTION */}
    </>
  );
};

export default TurfGroundPage;
