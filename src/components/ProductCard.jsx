"use client";
import React from "react";
import Rating from "./Rating";
import { findDiscountedPrice } from "../utils/helperFunctions";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { BiSolidCartAdd } from "react-icons/bi";
import { updateCartAsync } from "@/lib/store/async/cartAsyncThunk";
import FavoriteIcon from "./FavoriteIcon";
import { useClerk, useUser } from "@clerk/nextjs";
import { toast } from "react-toastify";

function ProductCard({
  id,
  title,
  price,
  imgUrl,
  rating,
  discountPercentage,
  ratingCount,
  availabilityStatus = "In Stock",
}) {
  const { redirectToSignIn } = useClerk();
  const { isSignedIn } = useUser();

  const cartData = useSelector((state) => state.cart);
  const router = useRouter();
  const dispatch = useDispatch();
  const discountedPrice = findDiscountedPrice(
    parseInt(price),
    parseInt(discountPercentage)
  );

  return (
    <div
      className="max-w-[300px] relative p-3 w-full rounded-2xl bg-[#1a1a1a] text-yellow-100 cursor-pointer transition-all overflow-hidden shadow-md shadow-yellow-500/10 hover:shadow-yellow-500/20 hover:scale-[1.02] border border-yellow-600/20"
      onClick={() => router.push(`/products/${id}`)}
    >
      <img
        src={imgUrl}
        alt={title}
        className="mx-auto h-[160px] rounded-xl object-cover mb-3"
      />
      <div className="flex flex-col items-center text-center">
        <h2 className="line-clamp-2 font-semibold text-yellow-300 text-sm md:text-base mb-1">
          {title}
        </h2>
        <div className="flex items-center my-1 gap-2">
          <span className="text-lg font-bold text-yellow-400">
            ${discountedPrice}
          </span>
          <span className="text-yellow-700 line-through text-sm">${price}</span>
        </div>
        <div className="flex gap-1 items-center text-yellow-500 text-sm">
          <Rating rating={rating} />
          <span className="text-xs">({ratingCount})</span>
        </div>
      </div>
      <div className="relative w-full mt-3 flex gap-2">
        <div
          className="flex-1 text-black text-sm font-medium text-center bg-yellow-400 rounded p-1 flex items-center justify-center gap-1 hover:bg-yellow-300 active:scale-95 transition-all"
          onClick={(e) => {
            e.stopPropagation();
            // console.log(isSignedIn);
            if (isSignedIn) {
              dispatch(
                updateCartAsync({
                  cartId: cartData.cartId,
                  productId: id,
                  type: "addToCart",
                  productDetails: {
                    productId: id,
                    price: discountedPrice,
                    title: title,
                    img: imgUrl,
                  },
                })
              );
              router.push(`/cart/${cartData.cartId}`);
            } else {
              toast.warn("Please sign in to buy product");
              redirectToSignIn({ returnBackUrl: window.location.href });
            }
          }}
        >
          Buy now
        </div>
        <div
          className="min-w-[40px] bg-yellow-600 rounded flex items-center justify-center p-1 text-black hover:bg-yellow-500 active:scale-95 transition-all"
          onClick={(e) => {
            e.stopPropagation();
            if (isSignedIn) {
              dispatch(
                updateCartAsync({
                  cartId: cartData.cartId,
                  productId: id,
                  type: "addToCart",
                  productDetails: {
                    productId: id,
                    price: discountedPrice,
                    title: title,
                    img: imgUrl,
                  },
                })
              );
            } else {
              toast.warn("Please sign in to add product to cart");
              redirectToSignIn({ returnBackUrl: window.location.href });
            }
          }}
        >
          <BiSolidCartAdd />
        </div>
      </div>
      <FavoriteIcon
        productObj={{
          id,
          title,
          price,
          imgUrl,
          rating,
          discountPercentage,
          ratingCount,
          availabilityStatus,
        }}
      />
      {discountPercentage >= 60 && (
        <div className="absolute bg-red-600 text-white text-xs px-2 py-0.5 top-2 left-2 rounded shadow-md shadow-black/40">
          SALE
        </div>
      )}
      {availabilityStatus === "Low Stock" && (
        <div className="absolute bg-orange-500 text-white text-[10px] px-2 py-0.5 top-10 left-2 rounded shadow-md shadow-black/40">
          Low Stock
        </div>
      )}
      <span className="absolute bg-yellow-500/80 px-1 py-0.5 text-black text-xs top-2 right-2 rounded-tr-md rounded-bl-md">
        {discountPercentage}% off
      </span>
    </div>
  );
}

export default ProductCard;
