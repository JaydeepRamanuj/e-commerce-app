"use client";
import { updateCartAsync } from "@/lib/store/async/cartAsyncThunk";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { findDiscountedPrice } from "../utils/helperFunctions";

function AddToCartButton({
  productId,
  price,
  discountPercentage,
  title,
  imgUrl,
}) {
  console.log("productId::", productId);
  console.log("title::", title);
  console.log("imgUrl::", imgUrl);
  const dispatch = useDispatch();
  const cartData = useSelector((state) => state.cart);
  console.log("cartId::", cartData.cartId);
  const discountedPrice = findDiscountedPrice(
    parseInt(price),
    parseInt(discountPercentage)
  );
  console.log("discountedPrice::", discountedPrice);
  return (
    <div
      className="mt-3 bg-yellow-600  text-center text-white rounded-2xl hover:bg-yellow-700 cursor-pointer active:scale-95"
      onClick={() => {
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
      }}
    >
      Add to cart
    </div>
  );
}

export default AddToCartButton;
