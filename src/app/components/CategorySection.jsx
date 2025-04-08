import React from "react";
import CategoryList from "./CategoryList";

async function CategorySection({ title, type, category, length = null }) {
  let products = [];
  try {
    const params = new URLSearchParams();

    if (type) params.append("type", type);
    if (category) params.append("category", category);

    const url = `http://localhost:3000/api/products?${params.toString()}`;

    const response = await fetch(url);
    products = await response.json();
    length && (products = products.slice(0, 3));
  } catch (error) {
    console.log(`Error fetching products of type :${type}`, error);
  }
  return <CategoryList title={title} products={products} />;
}

export default CategorySection;
