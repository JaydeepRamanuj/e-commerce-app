"use client";
import { updateUserAsync } from "@/lib/store/async/userAsyncThunk";
import {
  addItemToWishlist,
  removeItemFromWishlist,
} from "@/lib/store/slices/userSlice";
import { useClerk, useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import { IoHeart, IoHeartOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

function FavoriteIcon({ productObj }) {
  const userData = useSelector((state) => state.user);
  const [isFavorite, setFavorite] = useState(
    userData.wishlist.find((product) => product.id == productObj.id)
  );
  const dispatch = useDispatch();
  const { redirectToSignIn } = useClerk();
  const { isSignedIn } = useUser();
  useEffect(() => {}, [userData]);
  return (
    <div
      className="absolute top-8 right-2 size-10 rounded-full ml-auto bg-slate-400/20 hover:bg-slate-400/30 text-red-400 flex items-center justify-center text-xl cursor-pointer active:scale-[0.85] transition-all"
      onClick={(e) => {
        e.stopPropagation();
        if (isSignedIn) {
          if (!isFavorite) {
            dispatch(
              updateUserAsync({
                userId: userData.userId,
                data: productObj,
                type: "addItemToWishlist",
              })
            );
          } else {
            console.log(userData);
            dispatch(
              updateUserAsync({
                userId: userData.userId,
                data: productObj.id,
                type: "removeItemFromWishlist",
              })
            );
          }
          setFavorite(!isFavorite);
        } else {
          toast.warn("Please sign in to wishlist product");
        }
      }}
    >
      {isFavorite ? <IoHeart /> : <IoHeartOutline />}
    </div>
  );
}

export default FavoriteIcon;
