import ProductCard from "@/app/components/ProductCard";
import { makeCapitalize } from "@/app/utils/helperFunctions";
import React from "react";

async function CategoryPage({ params }) {
  const { category } = await params;
  // console.log("category:", category);
  let products = [];
  try {
    const response = await fetch(
      `http://localhost:3000/api/categories/${category}`
    );
    products = await response.json();
  } catch (error) {
    console.log("Error fetching products:", error);
  }
  return (
    <div>
      <h1 className="my-6 text-3xl text-white text-center font-bold p-3 rounded-md bg-white/10">
        {makeCapitalize(category)}
      </h1>
      <div className="p-3 responsive-grid">
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

export default CategoryPage;
