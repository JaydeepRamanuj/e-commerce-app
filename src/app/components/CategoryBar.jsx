"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { categoriesList } from "../constants";

function CategoryBar() {
  const router = useRouter();
  return (
    <div className="sticky top-[72px] lg:top-[86px] py-3 p-2 flex items-center bg-black/70 rounded gap-2 overflow-x-auto scrollbar-hide no-scrollbar mb-3 md:mb-6 z-10 lg:px-24">
      <span className="text-xl font-bold">Categories: </span>
      {categoriesList.map((category, index) => (
        <div
          key={index}
          className=" bg-gray-600/30 text-white text-center px-2 py-0.5 rounded hover:bg-gray-400/20 cursor-pointer active:scale-[0.97] whitespace-nowrap"
          onClick={() => {
            router.push(`/categories/${category.toLocaleLowerCase()}`);
          }}
        >
          {category}
        </div>
      ))}
    </div>
  );
}

export default CategoryBar;
