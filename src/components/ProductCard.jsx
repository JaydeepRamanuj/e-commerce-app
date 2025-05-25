"use client";
import React, { useEffect, useState } from "react";
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
      className="relative p-2.5 rounded w-full h-full bg-gray-200/10 min-w-[200px] hover:bg-gray-100/10 text-gray-600 cursor-pointer transition-all group overflow-hidden hover:shadow-2xl hover:pb-[50p] max-w-[250px]"
      onClick={() => {
        router.push(`/products/${id}`);
      }}
    >
      <img
        src={imgUrl}
        alt=""
        className="mx-auto h-[150px] rounded object-cover"
      />
      <div className="flex flex-col items-center">
        <h2 className="line-clamp-2 font-semibold text-gray-400 text-center">
          {title}
        </h2>
        <div className="flex items-center my-1 gap-2">
          <span className="text-lg font-semibold text-blue-300">
            ${discountedPrice}
          </span>
          <span className="text-gray-500 line-through">${price}</span>
        </div>
        <div>
          <span className="flex gap-2">
            <Rating rating={rating} />
            <span className="text-gray-500 text-xs font-semibold">
              ({ratingCount})
            </span>
          </span>
        </div>
      </div>
      <div className="relative lg:absolute w-[90%] mt-2 lg:-bottom-10 left-[5%] transition-all group-hover:bottom-2.5 flex gap-2">
        <div
          className="flex-1 text-white text-center bg-orange-500 rounded p-1 flex items-center justify-center gap-1.5 hover:bg-orange-600 active:scale-95"
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
          className="min-w-[40px] text-white text-center bg-blue-500 rounded p-1 flex items-center justify-center gap-1.5 hover:bg-blue-600  active:scale-95"
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
          id: id,
          title: title,
          price: price,
          imgUrl: imgUrl,
          rating: rating,
          discountPercentage: discountPercentage,
          ratingCount: ratingCount,
          availabilityStatus: availabilityStatus,
        }}
      />
      {discountPercentage >= 60 && (
        <div className="absolute bg-red-400 rounded-xs text-white text-center text-xs px-2 py-0.5 top-2 left-0 rounded-l-none">
          sale
        </div>
      )}

      {availabilityStatus == "Low Stock" && (
        <div className="absolute bg-orange-400 rounded-xs text-white text-center text-[9px] px-2 py-0.5 top-8 left-0 rounded-l-none">
          Low <br /> Stock
        </div>
      )}

      <span className=" absolute bg-orange-400/60 px-1 text-white text-xs  top-0 right-0 rounded-tr-md  rounded-bl-md">
        {discountPercentage}% off
      </span>
    </div>
  );
}

export default ProductCard;
