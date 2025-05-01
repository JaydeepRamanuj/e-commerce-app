import { setCart, updateCart } from "@/lib/firebase/cartServices";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  addToCart,
  decreaseProductAmount,
  increaseProductAmount,
  removeFromCart,
} from "../slices/cartSlice";
import { baseUrl } from "@/app/constants";

export const updateCartAsync = createAsyncThunk(
  "cart/updateCartAsync",
  async (
    { cartId, productId, productDetails, type },
    { dispatch, getState }
  ) => {
    try {
      switch (type) {
        case "addToCart":
          dispatch(addToCart(productDetails));
          break;
        case "removeFromCart":
          dispatch(removeFromCart(productId));
          break;
        case "increaseProductAmount":
          dispatch(increaseProductAmount(productId));
          break;
        case "decreaseProductAmount":
          dispatch(decreaseProductAmount(productId));
          break;
      }

      const cartData = getState().cart;

      // const res = updateCart(cartId, cartData);

      // const res = await fetch(`${baseUrl}/api/cart/${cartId}/`, {
      const res = await fetch(`/api/cart/${cartId}/`, {
        method: "POST",
        body: JSON.stringify({
          cartId: cartId,
          cartData: cartData,
        }),
      });

      if (res.ok) {
        if (["addToCart", "increaseProductAmount"].includes(type)) {
          toast.success("Product added to cart");
        } else {
          toast.info("Product removed from cart");
        }
      } else {
        toast("Oops something went wrong");
      }
    } catch (error) {
      console.log("Error while updating cart", error.message);
    }
  }
);

// export const addToCartAsync = createAsyncThunk(
//   "cart/addToCartAsync",
//   async ({ cartId, productDetails }, { dispatch, getState }) => {
//     try {
//       dispatch(addToCart(productDetails));
//       const cartData = getState().cart;
//       if (updateCart(cartId, cartData)) {
//         toast("Product added to cart");
//       } else {
//         toast("Oops something went wrong");
//       }
//     } catch (error) {
//       console.log("Error while adding product to cart", error.message);
//     }
//   }
// );

// export const removeFromCartAsync = createAsyncThunk(
//   "cart/removeFromCartAsync",
//   async ({ cartId, productId }, { dispatch, getState }) => {
//     try {
//       dispatch(removeFromCart(productId));
//       const cartData = getState().cart;
//       console.log("from thunk: ", cartData);
//       if (updateCart(cartId, cartData)) {
//         toast("Product removed from cart");
//       } else {
//         toast("Oops something went wrong");
//       }
//     } catch (error) {
//       console.log("Error while removing product from cart", error.message);
//     }
//   }
// );

// export const increaseProductAmountAsync = createAsyncThunk(
//   "cart/increaseProductAmountAsync",
//   () => {}
// );
// export const decreaseProductAmountAsync = createAsyncThunk(
//   "cart/decreaseProductAmountAsync",
//   () => {}
// );
