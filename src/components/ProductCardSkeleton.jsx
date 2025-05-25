import React from "react";
import Skeleton from "react-loading-skeleton";

const ProductCardSkeleton = () => {
  return (
    <div className="max-w-[300px] w-full p-3 rounded-2xl bg-[#1a1a1a] text-yellow-100 cursor-pointer transition-all overflow-hidden shadow-md shadow-yellow-500/10 border border-yellow-600/20">
      <div className="mx-auto h-[160px] mb-3 rounded-xl overflow-hidden">
        <Skeleton
          height="100%"
          width="100%"
          baseColor="#333"
          highlightColor="#444"
        />
      </div>

      <div className="flex flex-col items-center text-center">
        <Skeleton
          count={2}
          width={200}
          height={12}
          baseColor="#333"
          highlightColor="#444"
          style={{ marginBottom: "8px" }}
        />

        <div className="flex items-center gap-2 my-1">
          <Skeleton
            width={60}
            height={20}
            baseColor="#444"
            highlightColor="#555"
          />
          <Skeleton
            width={40}
            height={14}
            baseColor="#333"
            highlightColor="#444"
          />
        </div>

        <div className="flex items-center gap-1">
          <Skeleton
            width={60}
            height={12}
            baseColor="#333"
            highlightColor="#444"
          />
          <Skeleton
            width={30}
            height={12}
            baseColor="#333"
            highlightColor="#444"
          />
        </div>
      </div>

      <div className="w-full mt-3 flex gap-2">
        <Skeleton
          className="flex-1"
          height={36}
          baseColor="#555"
          highlightColor="#666"
        />
        <Skeleton
          width={40}
          height={36}
          baseColor="#444"
          highlightColor="#555"
        />
      </div>

      {/* Optional: Sale, Stock and Discount badges */}
      <div className="absolute top-2 left-2">
        <Skeleton
          width={40}
          height={16}
          baseColor="#822"
          highlightColor="#a33"
        />
      </div>
      <div className="absolute top-10 left-2">
        <Skeleton
          width={60}
          height={14}
          baseColor="#954"
          highlightColor="#b75"
        />
      </div>
      <div className="absolute top-2 right-2">
        <Skeleton
          width={50}
          height={18}
          baseColor="#aa0"
          highlightColor="#ff2"
        />
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
