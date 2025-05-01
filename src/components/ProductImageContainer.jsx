"use client";
import React, { useState } from "react";

function ProductImageContainer({ productData }) {
  const [activeImg, setActiveImg] = useState(productData.images[0]);
  return (
    <div className="flex gap-4 flex-1 lg:w-[50%]">
      <div className="flex flex-col gap-8 mr-4 ">
        {productData.images.map((image, index) => (
          <div
            className="h-10 w-12 p-2 rounded-md border  cursor-pointer hover:bg-gray-300/20"
            key={index}
            onClick={() => {
              setActiveImg(image);
            }}
          >
            <img src={image} alt="" className="w-full h-full object-cover" />
          </div>
        ))}
      </div>
      <div className="relative mx-auto lg:mx-none lg:mr-6 border-2 border-gray-300/20 rounded-md h-fit">
        <img
          src={activeImg}
          alt=""
          // className=" transition-all rounded-md max-w-[250px] xl:max-w-[650px]"
          className="transition-all rounded-md h-full w-full max-w-[300px] max-h-[300px] lg:max-w-none lg:max-h-none"
        />
        <div
          className={`absolute px-2.5 py-1 text-center text-white top-6 right-0 rounded rounded-r-none font-semibold  ${
            productData.availabilityStatus == "Low Stock"
              ? "bg-orange-400"
              : "bg-green-600"
          }`}
        >
          {productData.availabilityStatus}
        </div>
      </div>
    </div>
  );
}

export default ProductImageContainer;
