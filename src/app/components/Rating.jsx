import React from "react";
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";

function Rating({ rating }) {
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    if (rating >= i) {
      // Full star
      stars.push(<FaStar key={i} className="text-yellow-500" />);
    } else if (rating >= i - 0.5) {
      // Half star
      stars.push(<FaStarHalfAlt key={i} className="text-yellow-500" />);
    } else {
      // Empty star
      stars.push(<FaRegStar key={i} className="text-gray-400" />);
    }
  }

  return <div className="flex gap-1">{stars}</div>;
}

export default Rating;
