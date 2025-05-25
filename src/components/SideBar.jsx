"use client";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import SignInComponent from "./SignInComponent";
import CartMenu from "./CartMenu";
import { useRouter } from "next/navigation";
import { toggleSidebar } from "@/lib/store/slices/toolSlice";
import { useBreakpoint } from "../hooks/useBreakpoint";
import { IoHeart } from "react-icons/io5";
import { useClerk, useUser } from "@clerk/nextjs";
import { toast } from "react-toastify";

function SideBar() {
  const toolData = useSelector((state) => state.tool);
  const router = useRouter();
  const breakpoint = useBreakpoint();
  const userData = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { openSignIn } = useClerk();
  const { isSignedIn } = useUser();

  return (
    <>
      {breakpoint < 992 && (
        <div
          className={`h-[70%] fixed ${
            toolData.isSidebarVisible ? "right-0" : "-right-full"
          } top-1/2 -translate-y-1/2 bg-black/80 backdrop-blur-md flex flex-col items-center gap-4 p-6 rounded-l-xl transition-all duration-300 border border-yellow-400/20 border-r-0 shadow-lg shadow-yellow-400/10`}
        >
          <SignInComponent />

          <span
            className="p-2 rounded-md bg-yellow-400/10 text-yellow-200 flex flex-col justify-center items-center hover:bg-yellow-400/20 cursor-pointer transition"
            onClick={() => {
              dispatch(toggleSidebar());
            }}
          >
            <CartMenu />
            <span className="text-sm font-medium">Cart</span>
          </span>

          <span
            className="p-2 rounded-md bg-yellow-400/10 text-yellow-200 flex flex-col justify-center items-center hover:bg-yellow-400/20 cursor-pointer transition"
            onClick={() => {
              if (isSignedIn) {
                router.push(`/wishlist`);
              } else {
                toast.warn("Please sign in to add product to cart");
                openSignIn({ returnBackUrl: window.location.href });
              }
              dispatch(toggleSidebar());
            }}
          >
            <span className="relative">
              <IoHeart className="text-4xl text-yellow-300 hover:text-yellow-200 transition" />
              {userData.wishlist.length > 0 && (
                <div className="absolute size-4 p-0.5 rounded-full bg-red-500 text-white text-xs font-semibold flex justify-center items-center -right-0.5 -top-0.5 ring-1 ring-yellow-400">
                  {userData.wishlist.length}
                </div>
              )}
            </span>
            <span className="text-sm font-medium">Wishlist</span>
          </span>
        </div>
      )}
    </>
  );
}

export default SideBar;
