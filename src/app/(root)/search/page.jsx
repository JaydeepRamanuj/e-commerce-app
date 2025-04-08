import SearchResult from "@/app/components/SearchResult";
import { sitePath } from "@/app/constants";
import React from "react";

async function SearchPage() {
  let products = [];
  try {
    const response = await fetch(`${sitePath}/api/search`);
    products = await response.json();
  } catch (error) {
    console.log("Error fetching products:", error);
  }

  return (
    <div>
      <h1 className="my-6 text-3xl text-white text-center font-bold p-3 rounded-md bg-white/10">
        Search Results
      </h1>
      <SearchResult products={products} />
    </div>
  );
}

export default SearchPage;
