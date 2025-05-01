export const dynamic = "force-dynamic";

import SearchResult from "@/components/SearchResult";
import React from "react";

async function SearchPage() {
  let products = [];
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;
    const response = await fetch(`${baseUrl}/api/search`);

    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }

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
