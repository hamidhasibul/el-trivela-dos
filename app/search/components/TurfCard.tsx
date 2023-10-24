import Price from "@/app/components/Price";
import { TurfCardType } from "@/app/page";
import Link from "next/link";
import React from "react";

const TurfCard = ({ turf }: { turf: TurfCardType }) => {
  return (
    <>
      {/* Turf CARD */}
      <div className="border-b flex pb-5 ml-4 mt-5">
        <img src={turf.main_image} alt="" className="w-44 rounded" />
        <div className="pl-5">
          <h2 className="text-3xl">{turf.name}</h2>
          <div className="flex items-start">
            <div className="flex mb-2">*****</div>
            <p className="ml-2 text-sm">Awesome</p>
          </div>
          <div className="mb-9">
            <div className="font-light flex text-reg">
              <Price price_type={turf.price_type} />
              <p className="mr-4 capitalize">{turf.turf_type.name}</p>
              <p className="mr-4 capitalize">{turf.location.name}</p>
            </div>
          </div>
          <div className="text-red-600">
            <Link href={`/turf/${turf.slug}`}>View more information</Link>
          </div>
        </div>
      </div>
      {/*Turf CARD */}
    </>
  );
};

export default TurfCard;
