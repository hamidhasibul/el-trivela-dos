import { Ground } from "@prisma/client";
import React from "react";

const GroundCard = ({ ground }: { ground: Ground }) => {
  return (
    <div className=" border rounded p-3 w-[49%] mb-3">
      <h3 className="font-bold text-lg">{ground.name}</h3>
      <p className="font-light mt-1 text-sm">{ground.description}</p>
      <p className="mt-7">{ground.price}</p>
    </div>
  );
};

export default GroundCard;
