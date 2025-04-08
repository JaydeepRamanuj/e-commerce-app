'use client"';
import { useRouter } from "next/navigation";
import React from "react";

function SearchKey({ id, title, isCategory }) {
  const router = useRouter();
  return (
    <div
      className="mt-1 flex gap-4 px-1 cursor-pointer text-gray-300 hover:text-white hover:bg-white/10 rounded active:scale-95"
      onMouseDown={() => {
        router.push(`/products/${id}`);
      }}
    >
      <span>{title}</span>
      {isCategory && (
        <span className="text-xs text-gray-500/60">(category)</span>
      )}
    </div>
  );
}

export default SearchKey;
