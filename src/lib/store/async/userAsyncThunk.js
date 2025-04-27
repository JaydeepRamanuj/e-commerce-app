import { createAsyncThunk } from "@reduxjs/toolkit";
import { addItemToWishlist, removeItemFromWishlist } from "../slices/userSlice";
import {
  addProductToWishlist,
  removeProductFromWishlist,
} from "@/lib/firebase/wishlistServices";

export const updateUserAsync = createAsyncThunk(
  "user/updateUserAsync",
  ({ userId, data, type }, { dispatch }) => {
    try {
      if (type == "addItemToWishlist") {
        dispatch(addItemToWishlist(data));
        addProductToWishlist(userId, data);
      } else if (type == "removeItemFromWishlist") {
        dispatch(removeItemFromWishlist(data));
        removeProductFromWishlist(userId, data);
      }
    } catch (error) {
      console.log("Error while updating user data", error);
    }
  }
);
