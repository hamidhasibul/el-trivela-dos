import { Location, PRICE_TYPE, PrismaClient, Turf_type } from "@prisma/client";
import Link from "next/link";
import React from "react";

const prisma = new PrismaClient();

const SideBar = async ({
  locations,
  turfTypes,
  searchParams,
}: {
  locations: Location[];
  turfTypes: Turf_type[];
  searchParams: { city?: string; turf_type?: string; price_type?: PRICE_TYPE };
}) => {
  return (
    <>
      <div className="border-b pb-4 flex flex-col">
        <h1 className="mb-2">Location</h1>

        {locations.map((location) => (
          <Link
            href={{
              pathname: "/search",
              query: {
                ...searchParams,
                city: location.name,
              },
            }}
            className="font-light text-reg capitalize"
            key={location.id}
          >
            {location.name}
          </Link>
        ))}
      </div>
      <div className="border-b pb-4 mt-3 flex flex-col">
        <h1 className="mb-2">Turf Type</h1>
        {turfTypes.map((turfType) => (
          <Link
            href={{
              pathname: "/search",
              query: {
                ...searchParams,
                turf_type: turfType.name,
              },
            }}
            className="font-light text-reg capitalize"
            key={turfType.id}
          >
            {turfType.name.replace("-", " ")}
          </Link>
        ))}
      </div>
      <div className="mt-3 pb-4">
        <h1 className="mb-2">Price</h1>
        <div className="flex">
          <Link
            href={{
              pathname: "/search",
              query: {
                ...searchParams,
                price_type: PRICE_TYPE.BUDGET,
              },
            }}
            className="border w-full text-reg font-light rounded-l p-2"
          >
            $
          </Link>
          <Link
            href={{
              pathname: "/search",
              query: {
                ...searchParams,
                price_type: PRICE_TYPE.STANDARD,
              },
            }}
            className="border-r border-t border-b w-full text-reg font-light p-2"
          >
            $$
          </Link>
          <Link
            href={{
              pathname: "/search",
              query: {
                ...searchParams,
                price_type: PRICE_TYPE.PREMIUM,
              },
            }}
            className="border-r border-t border-b w-full text-reg font-light p-2 rounded-r"
          >
            $$$
          </Link>
        </div>
      </div>
    </>
  );
};

export default SideBar;
