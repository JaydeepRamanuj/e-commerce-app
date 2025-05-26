"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { categoriesList } from "@/app/constants";

function CategoryBar() {
  const router = useRouter();

  return (
    <div className=" mb-4 md:mb-6 px-2 lg:px-24">
      <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide no-scrollbar bg-black/70 backdrop-blur-md p-3 rounded-lg">
        <span className="text-lg sm:text-xl font-semibold text-yellow-400 whitespace-nowrap">
          Categories:
        </span>

        {categoriesList.map((category, index) => (
          <div
            key={index}
            role="button"
            tabIndex={0}
            onClick={() => router.push(`/categories/${category.toLowerCase()}`)}
            className="text-sm sm:text-base text-yellow-100 bg-yellow-500/10 border border-yellow-400/20 px-3 py-1 rounded-full cursor-pointer hover:bg-yellow-400/20 active:scale-95 transition-all whitespace-nowrap"
          >
            {category}
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoryBar;
