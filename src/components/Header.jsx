"use client";
import React from "react";
import SearchBar from "./SearchBar";
import CartMenu from "./CartMenu";
import { useRouter } from "next/navigation";

import { useBreakpoint } from "../hooks/useBreakpoint";
import SignInComponent from "./SignInComponent";
import { IoClose } from "react-icons/io5";
import { FaBars } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar } from "@/lib/store/slices/toolSlice";

function Header() {
  const router = useRouter();
  const breakpoint = useBreakpoint();
  const toolData = useSelector((state) => state.tool);
  const dispatch = useDispatch();

  if (breakpoint === null) return null;

  return (
    <>
      {breakpoint < 992 ? (
        <div className="sticky top-0 flex justify-between items-center p-4 bg-[#0F0F0F] text-white z-20">
          <span
            className="cursor-pointer flex gap-3 items-center"
            onClick={() => router.push("/")}
          >
            <img src="/website_logo.png" alt="Logo" className="size-8" />
          </span>

          <SearchBar />

          <div
            className="size-10 rounded-full bg-white/10 flex justify-center items-center p-1 hover:bg-white/20 cursor-pointer"
            onClick={() => dispatch(toggleSidebar())}
          >
            {toolData.isSidebarVisible ? (
              <IoClose className="size-6" />
            ) : (
              <FaBars />
            )}
          </div>
        </div>
      ) : (
        <div className="sticky top-0 w-full flex items-center justify-between px-12 py-5 bg-[#0F0F0F] text-white z-20 border-b border-white/10">
          <div
            className="flex items-center gap-4 cursor-pointer"
            onClick={() => router.push("/")}
          >
            <img src="/website_logo.png" alt="Logo" className="size-10" />
            <h1 className="text-xl font-semibold tracking-wide  text-yellow-400 ">
              Next Baazar
            </h1>
          </div>

          <div className="ml-auto">
            <SearchBar />
          </div>

          <span
            className="ml-6 text-gray-300 hover:text-white text-sm cursor-pointer text-yellow-400"
            onClick={() => router.push("/wishlist")}
          >
            My Wishlist
          </span>

          <div className="ml-6 text-yellow-400">
            <CartMenu />
          </div>

          <div className="ml-4">
            <SignInComponent />
          </div>
        </div>
      )}
    </>
  );
}

export default Header;
