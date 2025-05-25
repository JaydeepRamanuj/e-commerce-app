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
import { getCartData, setCart } from "@/lib/firebase/cartServices";
import { initializeCart } from "@/lib/store/slices/cartSlice";
import { generateCardId } from "../utils/client-side-functions";

function SignInComponent() {
  const dispatch = useDispatch();
  const { user, isSignedIn } = useUser();

  useEffect(() => {
    const initializeSession = async () => {
      if (!user) return;

      const existingUser = await getUserInfo(user.id);

      if (existingUser) {
        dispatch(initializeUser(existingUser));
        const cartData = await getCartData(existingUser.cartId);
        dispatch(initializeCart(cartData));
      } else {
        const newCartId = generateCardId();

        const newUser = {
          userId: user.id,
          email: user.primaryEmailAddress?.emailAddress ?? "",
          username: user.username ?? "user",
          cartId: newCartId,
          wishlist: [],
        };

        const newCart = {
          cartId: newCartId,
          userId: user.id,
          itemTotalVal: 0,
          items: [],
          totalTax: 0,
          grandTotal: 0,
          taxApplicable: 18,
        };

        await createUser(newUser);
        await setCart(newCart);

        dispatch(initializeUser(newUser));
        dispatch(initializeCart(newCart));
      }
    };

    if (isSignedIn) {
      initializeSession();
    }
  }, [isSignedIn, user, dispatch]);

  return (
    <div>
      {isSignedIn ? (
        <SignedIn>
          <UserButton
            appearance={{
              elements: {
                userButtonBox:
                  "rounded-full border border-white/30 hover:border-white/60 transition-all",
              },
            }}
          />
        </SignedIn>
      ) : (
        <SignedOut>
          <SignInButton mode="modal">
            <button className="px-4 py-1.5 rounded-full bg-gradient-to-br from-yellow-500/30 to-yellow-300/30 text-yellow-200 border border-yellow-400/30 hover:from-yellow-500/50 hover:to-yellow-300/50 hover:text-white active:scale-95 transition-all duration-200">
              Sign in
            </button>
          </SignInButton>
        </SignedOut>
      )}
    </div>
  );
}

export default SignInComponent;
