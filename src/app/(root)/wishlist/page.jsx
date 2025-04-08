"use client";
import ProductCard from "@/app/components/ProductCard";
import React, { useState } from "react";
import { IoHeart, IoHeartOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

function WishlistPage() {
  const userData = useSelector((state) => state.user);
  const [isFavorite, setFavorite] = useState(false);
  return (
    <div>
      <h1 className="my-6 text-3xl text-white text-center font-bold p-3 rounded-md bg-white/10">
        Wishlist
      </h1>
      {userData.wishlist.length === 0 ? (
        <h1 className="my-6 min-h-[300px] bg-slate-300/10 rounded-md p-3 flex  justify-center items-center gap-3 gap-2 flex-wrap content-center">
          <span className="text-center">
            Add items to Wishlist by pressing heart icon
          </span>
          <div
            className="size-10 rounded-full  bg-slate-400/20 hover:bg-slate-400/30 text-red-400 flex items-center justify-center text-xl cursor-pointer active:scale-[0.85] transition-all"
            onClick={() => {
              setFavorite(!isFavorite);
              if (!isFavorite) {
                toast.success("Yup just like this 👍");
              } else {
                toast.info("This will remove item from wishlist");
              }
            }}
          >
            {isFavorite ? <IoHeart /> : <IoHeartOutline />}
          </div>
        </h1>
      ) : (
        <div className="mt-6 p-3 justify-between gap-3 rounded-md responsive-grid">
          {userData.wishlist.map((product, index) => (
            <ProductCard
              key={index}
              imgUrl={product.imgUrl}
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
      )}
    </div>
  );
}

export default WishlistPage;
