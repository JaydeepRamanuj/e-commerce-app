"use client";
import { useRouter } from "next/navigation";
import React from "react";

function CheckoutButton({ id }) {
  const router = useRouter();
  return (
    <div
      className="mt-3 bg-orange-500 text-center text-white rounded-2xl hover:bg-orange-600 cursor-pointer active:scale-95"
      onClick={(e) => {
        e.stopPropagation();
        router.push(`/cart/${id}`);
      }}
    >
      Buy now
    </div>
  );
}

export default CheckoutButton;
