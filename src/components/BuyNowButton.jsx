"use client";
import { updateCartAsync } from "@/lib/store/async/cartAsyncThunk";
import { useRouter } from "next/navigation";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { findDiscountedPrice } from "../utils/helperFunctions";

function BuyNowButton({ productId, price, discountPercentage, title, imgUrl }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const cartData = useSelector((state) => state.cart);
  const discountedPrice = findDiscountedPrice(
    parseInt(price),
    parseInt(discountPercentage)
  );

  return (
    <div
      className="mt-3 bg-orange-500 text-center text-white rounded-2xl hover:bg-orange-600 cursor-pointer active:scale-95"
      onClick={(e) => {
        e.stopPropagation();
        dispatch(
          updateCartAsync({
            cartId: cartData.cartId,
            productId: productId,
            type: "addToCart",
            productDetails: {
              productId: productId,
              price: discountedPrice,
              title: title,
              img: imgUrl,
            },
          })
        );
        router.push(`/cart/${cartData.cartId}`);
      }}
    >
      Buy now
    </div>
  );
}

export default BuyNowButton;
