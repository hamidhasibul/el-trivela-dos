import { Stars } from "@/app/components/Stars";
import { calcReviewAvg } from "@/utils/calcReviewsAvg";
import { Review } from "@prisma/client";
import React from "react";

const Rating = ({ reviews }: { reviews: Review[] }) => {
  return (
    <div className="flex items-end">
      <div className="ratings mt-2 flex items-center">
        <Stars reviews={reviews} />
        <p className="text-reg ml-3">{calcReviewAvg(reviews)}</p>
      </div>
      <div>
        <p className="text-reg ml-4">{reviews.length} Reviews</p>
      </div>
    </div>
  );
};

export default Rating;
