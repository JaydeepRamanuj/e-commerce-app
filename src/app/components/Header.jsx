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
  console.log(breakpoint);
  if (breakpoint === null) return;
  <div className="sticky top-0 flex justify-between items-center p-4 bg-white/30 z-20"></div>;
  return (
    <>
      {breakpoint < 992 ? (
        <div className="sticky top-0 flex justify-between items-center p-4 bg-black z-20">
          <span
            className="cursor-pointer flex gap-3"
            onClick={() => {
              router.push("/");
            }}
          >
            <img src="/website_logo.png" alt="" className="size-8" />
          </span>
          <SearchBar />
          <div
            className="size-10 rounded-full bg-white/10 flex justify-center  items-center p-1 hover:bg-white/20 cursor-pointer"
            onClick={() => {
              dispatch(toggleSidebar());
            }}
          >
            {toolData.isSidebarVisible ? (
              <IoClose className="size-6" />
            ) : (
              <FaBars />
            )}
          </div>
        </div>
      ) : (
        <div className="sticky top-0 flex justify-between items-center p-6 bg-black z-20 lg:px-24">
          <span
            className="cursor-pointer flex gap-3"
            onClick={() => {
              router.push("/");
            }}
          >
            <img src="/website_logo.png" alt="" className="size-8" />
            <h1 className="text-2xl">Next Baazar</h1>
          </span>
          <span className="ml-auto">
            <SearchBar />
          </span>
          <span
            className="ml-auto mr-3 cursor-pointer text-gray-300 hover:text-gray-200"
            onClick={() => {
              router.push(`/wishlist`);
            }}
          >
            My wishlist
          </span>

          <span className="ml-6 mr-3">
            <CartMenu />
          </span>
          <SignInComponent />
        </div>
      )}
    </>
  );
}

export default Header;
