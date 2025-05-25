"use client";
import { updateCartAsync } from "@/lib/store/async/cartAsyncThunk";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { findDiscountedPrice } from "../utils/helperFunctions";
import { useClerk, useUser } from "@clerk/nextjs";
import { toast } from "react-toastify";

function AddToCartButton({
  productId,
  price,
  discountPercentage,
  title,
  imgUrl,
}) {
  const { openSignIn } = useClerk();
  const { isSignedIn } = useUser();
  const dispatch = useDispatch();
  const cartData = useSelector((state) => state.cart);
  const discountedPrice = findDiscountedPrice(
    parseInt(price),
    parseInt(discountPercentage)
  );
  return (
    <div
      className="flex-1 text-black text-sm font-medium text-center bg-orange-400 rounded p-1 flex items-center justify-center gap-1 hover:bg-yellow-300 active:scale-95 transition-all"
      onClick={(e) => {
        e.stopPropagation();
        if (isSignedIn) {
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
        } else {
          toast.warn("Please sign in to add product to cart");
          openSignIn({ returnBackUrl: window.location.href });
        }
      }}
    >
      Add to cart
    </div>
  );
}

export default AddToCartButton;
