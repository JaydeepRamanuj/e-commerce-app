import React from "react";
import Skeleton from "react-loading-skeleton";

const ProductCardSkeleton = () => {
  return (
    <div className="w-full max-w-[300px] bg-[#1a1a1a] border border-yellow-500/10 rounded-lg p-4 flex flex-col items-center animate-pulse shadow-md shadow-yellow-500/5">
      <div className="w-full h-40 bg-gray-700/40 rounded mb-4" />

      <div className="h-4 bg-gray-600/40 rounded  mb-2" />
      <div className="h-4 bg-gray-600/40 rounded mb-4" />
      <div className="flex items-center gap-2 mb-3">
        <div className="h-5 w-16 bg-yellow-400/30  rounded" />
        <div className="h-4 w-12 bg-gray-500/40 rounded" />
      </div>

      <div className="flex gap-1 mb-4   w-3/4 justify-center">
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="w-4 h-4 bg-gray-600/30 rounded" />
        ))}
      </div>

      <div className="w-full mt-auto flex gap-3">
        <div className="h-10 grow bg-yellow-400/30 rounded" />
        <div className="h-10 w-12  bg-gray-500/40 rounded" />
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
