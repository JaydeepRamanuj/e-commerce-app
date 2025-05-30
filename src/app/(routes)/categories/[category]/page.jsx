import ProductCard from "@/components/ProductCard";
import { makeCapitalize } from "@/utils/helperFunctions";
import React from "react";

async function CategoryPage({ params }) {
  const { category } = await params;
  let products = [];
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;
    const response = await fetch(`${baseUrl}/api/categories/${category}`);
    products = await response.json();
  } catch (error) {
    console.log("Error fetching products:", error);
  }
  return (
    <div>
      <h1 className="my-6 text-3xl text-white text-center font-bold p-3 rounded-md bg-white/10 bg-yellow-600/10 text-yellow-400 border border-yellow-500/30 rounded">
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
