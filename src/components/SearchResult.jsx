"use client";
import React from "react";
import CategoryList from "./CategoryList";
import { useSelector } from "react-redux";

function SearchResult({ products }) {
  const toolData = useSelector((state) => state.tool);
  const activeSearchKeys = toolData.activeSearchKeys;
  const filteredProducts = products.filter((product) =>
    activeSearchKeys.some((key) => parseInt(key.id) == parseInt(product.id))
  );
  // console.log(activeSearchKeys);
  // console.log(filteredProducts);
  return <CategoryList products={filteredProducts} />;
}

export default SearchResult;
