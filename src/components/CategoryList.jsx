import React from "react";
import { FaCaretRight } from "react-icons/fa";
import ProductCard from "./ProductCard";

function CategoryList({ title, products }) {
  return (
    <div className="my-6 bg-[#0f0f0f] border border-yellow-600/30 shadow-lg shadow-yellow-400/5 rounded-2xl p-6">
      <div className="flex justify-between items-center mb-4">
        <span className="text-2xl md:text-4xl font-bold text-yellow-500 uppercase tracking-wide drop-shadow-sm">
          {title}
        </span>
        {/* <span className="cursor-pointer bg-yellow-600/10 text-yellow-400 border border-yellow-500/30 rounded px-3 py-1 flex items-center gap-2 hover:bg-yellow-600/20 hover:text-yellow-300 active:scale-95 transition-all">
          more <FaCaretRight />
        </span> */}
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
