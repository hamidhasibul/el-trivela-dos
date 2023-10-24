import { Location, PrismaClient, Turf_type } from "@prisma/client";
import React from "react";

const prisma = new PrismaClient();

const SideBar = async ({
  locations,
  turfTypes,
}: {
  locations: Location[];
  turfTypes: Turf_type[];
}) => {
  return (
    <>
      <div className="border-b pb-4">
        <h1 className="mb-2">Location</h1>

        {locations.map((location) => (
          <p className="font-light text-reg capitalize" key={location.id}>
            {location.name}
          </p>
        ))}
      </div>
      <div className="border-b pb-4 mt-3">
        <h1 className="mb-2">Turf Type</h1>
        {turfTypes.map((turfType) => (
          <p className="font-light text-reg capitalize" key={turfType.id}>
            {turfType.name.replace("-", " ")}
          </p>
        ))}
      </div>
      <div className="mt-3 pb-4">
        <h1 className="mb-2">Price</h1>
        <div className="flex">
          <button className="border w-full text-reg font-light rounded-l p-2">
            $
          </button>
          <button className="border-r border-t border-b w-full text-reg font-light p-2">
            $$
          </button>
          <button className="border-r border-t border-b w-full text-reg font-light p-2 rounded-r">
            $$$
          </button>
        </div>
      </div>
    </>
  );
};

export default SideBar;
