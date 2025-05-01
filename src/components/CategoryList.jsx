import React from "react";
import { FaCaretRight } from "react-icons/fa";
import ProductCard from "./ProductCard";

function CategoryList({ title, products }) {
  return (
    <div className="my-6 bg-slate-300/10 rounded-md p-3">
      <div className="flex justify-between items-center">
        <span className="text-xl md:text-3xl font-semibold">{title}</span>
        <span className="cursor-pointer bg-white/20 rounded px-2 flex hover:bg-white/30 active:scale-95 items-center gap-2">
          more <FaCaretRight />
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
