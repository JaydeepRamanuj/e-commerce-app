import React, { Suspense } from "react";
import CategorySection from "./CategorySection";
import ProductCardSkeleton from "./ProductCardSkeleton";

function CategorySectionWrapper({ title, type, category, length = null }) {
  return (
    <Suspense
      fallback={
        // <div className="my-6 min-h-[300px] bg-yellow-900/10 border border-yellow-700/20 rounded-xl p-6 flex flex-col justify-center items-center gap-3">
        //   <span className="loader"></span>
        //   <span className="text-yellow-400">Loading {title}...</span>
        // </div>

        <div className="my-6 bg-[#0f0f0f] border border-yellow-600/30 shadow-lg shadow-yellow-400/5 rounded-2xl p-6">
          <div className="flex justify-between items-center mb-4">
            <span className="text-2xl md:text-4xl font-bold text-yellow-500 uppercase tracking-wide drop-shadow-sm">
              {title}
            </span>
          </div>
          <div className="mt-6 p-3 justify-between gap-3 rounded-md responsive-grid">
            {[1, 2, 3, 4, 5].map((_, index) => (
              <ProductCardSkeleton key={index} />
            ))}
          </div>
        </div>
      }
    >
      <CategorySection
        title={title}
        category={category}
        type={type}
        length={length}
      />
    </Suspense>
  );
}

export default CategorySectionWrapper;
