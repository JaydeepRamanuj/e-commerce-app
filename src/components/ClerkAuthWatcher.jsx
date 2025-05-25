"use client";

import { useEffect } from "react";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation"; // For App Router
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "@/lib/store/slices/userSlice";
import { clearCart } from "@/lib/store/slices/cartSlice";

function ClerkAuthWatcher() {
  const { isSignedIn, isLoaded } = useAuth();
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isLoaded) {
      return;
    }
    if (!isSignedIn) {
      dispatch(clearUser());
      dispatch(clearCart());
      router.push("/");
    }
  }, [isSignedIn, isLoaded]);

  return null;
}

export default ClerkAuthWatcher;
