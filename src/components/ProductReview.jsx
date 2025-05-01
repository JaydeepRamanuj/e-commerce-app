import React from "react";
import Rating from "./Rating";
import { formatDate } from "../utils/helperFunctions";

function ProductReview({
  id,
  name,
  review,
  rating,
  postedOn = "2024-05-23T08:56:21.620Z",
}) {
  return (
    <div>
      <div className="flex items-center gap-3 my-1.5">
        <img
          src="/male-profile.jpeg"
          alt=""
          className="size-6 rounded-full object-cover"
        />
        <span>{name}</span>
      </div>
      <Rating rating={parseInt(rating)} />
      <h5 className="mt-1 text-xs">Review posted on {formatDate(postedOn)}</h5>
      <h5 className="mt-2">{review}</h5>
    </div>
  );
}

export default ProductReview;
