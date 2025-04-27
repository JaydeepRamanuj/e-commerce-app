"use client";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import SignInComponent from "./SignInComponent";
import CartMenu from "./CartMenu";
import { useRouter } from "next/navigation";
import { toggleSidebar } from "@/lib/store/slices/toolSlice";
import { useBreakpoint } from "../hooks/useBreakpoint";
import { IoHeart } from "react-icons/io5";

function SideBar() {
  const toolData = useSelector((state) => state.tool);
  const router = useRouter();
  const breakpoint = useBreakpoint();
  const userData = useSelector((state) => state.user);
  const dispatch = useDispatch();

  return (
    <>
      {breakpoint < 992 && (
        <div
          className={`h-[70%] fixed ${
            toolData.isSidebarVisible ? "right-0" : "-right-full"
          }   top-1/2 -translate-y-1/2 bg-black/80 flex flex-col gap-4  p-6 fixed rounded-l-xl transition-all duration-300 border-1 border-gray-600/60 border-r-0`}
        >
          <SignInComponent />
          <span
            className="p-1.5 rounded bg-white/10 flex flex-col justify-center items-center hover:bg-white/20 cursor-pointer"
            onClick={() => {
              dispatch(toggleSidebar());
            }}
          >
            <CartMenu />
            <span>Cart</span>
          </span>
          <span
            className="p-1.5 rounded bg-white/10 flex flex-col justify-center items-center hover:bg-white/20 cursor-pointer"
            onClick={() => {
              router.push(`/wishlist`);
              dispatch(toggleSidebar());
            }}
          >
            <span className="w-fit cursor-pointer text-gray-300 hover:text-gray-200 relative">
              <IoHeart className="text-4xl" />
              {userData.wishlist.length > 0 && (
                <div className="absolute size-4 p-0.5 rounded-full bg-red-500 text-white text-xs font-semibold flex justify-center items-center -right-0.5 -top-0.5 outline-1 outline-sky-300">
                  {userData.wishlist.length}
                </div>
              )}
            </span>
            <span>Wishlist</span>
          </span>
        </div>
      )}
    </>
  );
}

export default SideBar;
