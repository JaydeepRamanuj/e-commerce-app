"use client";
import React, { useEffect } from "react";

import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import { useDispatch } from "react-redux";
import { createUser, getUserInfo } from "@/lib/firebase/userServices";
import { initializeUser } from "@/lib/store/slices/userSlice";
import { generateCardId } from "../utils/client-side-functions";
import { getCartData, setCart } from "@/lib/firebase/cartServices";
import { initializeCart } from "@/lib/store/slices/cartSlice";
function SignInComponent() {
  const dispatch = useDispatch();
  const { user, isSignedIn } = useUser();
  // console.log("user::", user);
  const handleSignin = async () => {
    if (user) {
      const existingUserData = await getUserInfo(user.id);
      // console.log("existingUserData:: ", existingUserData);
      if (existingUserData) {
        dispatch(initializeUser(existingUserData));
        const existingCartData = await getCartData(existingUserData.cartId);
        // console.log("existingCartData:: ", existingCartData);
        dispatch(initializeCart(existingCartData));
      } else {
        const newCartId = generateCardId();
        const newUserData = {
          userId: user.id,
          email: user.primaryEmailAddress.emailAddress,
          username: user.username,
          cartId: newCartId,
          wishlist: [],
        };
        const newCartData = {
          cartId: newCartId,
          userId: user.id,
          itemTotalVal: 0,
          items: [],
          totalTax: 0,
          grandTotal: 0,
          taxApplicable: 18,
        };
        await createUser(newUserData);
        await setCart(newCartData);
        dispatch(initializeUser(newUserData));
        dispatch(initializeCart(newCartData));
      }
    }
  };
  useEffect(() => {
    isSignedIn && handleSignin();
  }, [isSignedIn]);

  return (
    <div>
      {isSignedIn ? (
        <SignedIn>
          <UserButton />
        </SignedIn>
      ) : (
        <SignedOut>
          <SignInButton>
            <button className="px-3 py-1 rounded text-white bg-slate-600/40  hover:bg-slate-500/40 active:scale-95 cursor-pointer">
              Sign in
            </button>
          </SignInButton>
        </SignedOut>
      )}
    </div>
  );
}

export default SignInComponent;
