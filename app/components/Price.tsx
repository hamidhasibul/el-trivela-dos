import { PRICE_TYPE } from "@prisma/client";
import React from "react";

const Price = ({ price_type }: { price_type: PRICE_TYPE }) => {
  const renderPriceType = () => {
    if (price_type === PRICE_TYPE.BUDGET) {
      return (
        <>
          <span>$$</span>
          <span className="text-gray-400">$$</span>
        </>
      );
    } else if (price_type === PRICE_TYPE.STANDARD) {
      return (
        <>
          <span>$$$</span>
          <span className="text-gray-400">$</span>
        </>
      );
    } else {
      return (
        <>
          <span>$$$$</span>
        </>
      );
    }
  };
  return <p className="flex mr-3">{renderPriceType()}</p>;
};

export default Price;
