import { Review } from "@prisma/client";
import React from "react";
import { ReviewCard } from "./ReviewCard";

const Reviews = ({ reviews }: { reviews: Review[] }) => {
  return (
    <div>
      <h1 className="font-bold text-3xl mt-10 mb-7 borber-b pb-5">
        What {reviews.length} people are saying
      </h1>
      <div>
        {/* REVIEW CARD */}
        {reviews.length > 0 ? (
          <>
            {reviews.map((review) => (
              <ReviewCard review={review} key={review.id} />
            ))}
          </>
        ) : (
          <>
            <p>No reviews!!</p>
          </>
        )}

        {/* REVIEW CARD */}
      </div>
    </div>
  );
};

export default Reviews;
