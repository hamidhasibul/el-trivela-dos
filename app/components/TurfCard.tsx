import Link from "next/link";
import React from "react";
import { TurfCardType } from "../page";
import Price from "./Price";

interface Props {
  turf: TurfCardType;
}

const TurfCard = ({ turf }: Props) => {
  return (
    <Link href={`/turf/${turf.slug}`}>
      <div className="w-64 h-72 m-3 rounded overflow-hidden border cursor-pointer">
        <img src={turf.main_image} alt="" className="w-full h-36" />
        <div className="p-1">
          <h3 className="font-bold text-2xl mb-2">{turf.name}</h3>
          <div className="flex items-start">
            <div className="flex mb-2">*****</div>
            <p className="ml-2">77 reviews</p>
          </div>
          <div className="flex text-reg font-light capitalize">
            <p className=" mr-3">{turf.turf_type.name}</p>
            <Price price_type={turf.price_type} />
            <p>{turf.location.name}</p>
          </div>
          <p className="text-sm mt-1 font-bold">Booked 3 times today</p>
        </div>
      </div>
    </Link>
  );
};

export default TurfCard;
