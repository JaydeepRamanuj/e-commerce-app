"use client";
import { updateCartAsync } from "@/lib/store/async/cartAsyncThunk";
import { useRouter } from "next/navigation";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { findDiscountedPrice } from "../utils/helperFunctions";
import { useClerk, useUser } from "@clerk/nextjs";
import { toast } from "react-toastify";

function BuyNowButton({ productId, price, discountPercentage, title, imgUrl }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const cartData = useSelector((state) => state.cart);
  const { openSignIn } = useClerk();
  const { isSignedIn } = useUser();
  const discountedPrice = findDiscountedPrice(
    parseInt(price),
    parseInt(discountPercentage)
  );

  return (
    <div
      className="flex-1 text-black text-sm font-medium text-center bg-yellow-400 rounded p-1 flex items-center justify-center gap-1 hover:bg-yellow-300 active:scale-95 transition-all"
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
          router.push(`/cart/${cartData.cartId}`);
        } else {
          toast.warn("Please sign in to buy product");
          openSignIn({ returnBackUrl: window.location.href });
        }
      }}
    >
      Buy now
    </div>
  );
}

export default BuyNowButton;
