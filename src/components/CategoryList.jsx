import React from "react";
import { FaCaretRight } from "react-icons/fa";
import ProductCard from "./ProductCard";
import ProductCardSkeleton from "./ProductCardSkeleton";

function CategoryList({ title, products }) {
  return (
    <div className="my-6 bg-[#0f0f0f] border border-yellow-600/30 shadow-lg shadow-yellow-400/5 rounded-2xl p-6">
      <div className="flex justify-between items-center mb-4">
        <span className="text-2xl md:text-4xl font-bold text-yellow-500 uppercase tracking-wide drop-shadow-sm">
          {title}
        </span>
      </div>
      <div className="mt-6 p-3 justify-between gap-3 rounded-md responsive-grid">
        {products.map((product, index) => (
          <ProductCard
            key={index}
            imgUrl={product.thumbnail}
            id={product.id}
            price={product.price}
            rating={product.rating}
            title={product.title}
            discountPercentage={product.discountPercentage}
            ratingCount={product.ratingCount}
            availabilityStatus={product.availabilityStatus}
          />
        ))}
      </div>
    </div>
  );
}

export default CategoryList;
