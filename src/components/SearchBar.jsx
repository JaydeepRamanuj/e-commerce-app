"use client";
import {
  setActiveSearchKeys,
  setItemListForSearchBar,
} from "@/lib/store/slices/toolSlice";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { FaFilter } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductNameList } from "@/lib/firebase/productServices";
import SearchKey from "./SearchKey";
function SearchBar() {
  const dispatch = useDispatch();
  const toolData = useSelector((state) => state.tool);
  const [inpVal, setInpVal] = useState("");
  const [isSearchBarFocused, setSsSearchBarFocused] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const isFilterIconVisible =
    pathname.includes("/search") || pathname.includes("/category");

  async function handleFocus() {
    setSsSearchBarFocused(true);
    const productKeyList = await getAllProductNameList();
    dispatch(setItemListForSearchBar(productKeyList));
  }

  const handleBlur = async () => {
    setSsSearchBarFocused(false);
    // dispatch(setActiveSearchKeys([]));
  };

  function handleSearch(e) {
    if (e.target.value === "") {
      dispatch(setActiveSearchKeys([]));
    } else {
      const filteredKeys = toolData.itemListForSearchBar.filter((item) =>
        item.title.toLowerCase().startsWith(e.target.value.toLowerCase())
      );
      dispatch(setActiveSearchKeys(filteredKeys));
    }
  }
  return (
    <div className="flex">
      <div className="search-bar border border-white/20 rounded-full relative focus-within:border-white/80 ">
        <form
          action=""
          className="h-full flex"
          onSubmit={(e) => {
            e.preventDefault();
            router.push(`/search`);
            setInpVal("");
          }}
        >
          <input
            type="text"
            name=""
            id=""
            value={inpVal}
            placeholder="Search"
            className={`bg-transparent flex-1 max-w-[150px] sm:max-w-none   md:w-[450px] p-1.5 px-3 rounded-full transition-all rounded-r-none peer focus:pl-8 outline-none focus:outline-blue-500 outline-offset-0`}
            onChange={(e) => {
              setInpVal(e.target.value);
            }}
            onInput={handleSearch}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
          <span
            className="w-10 md:w-14 bg-white/10 min-h-full p-1.5 flex justify-center items-center rounded-r-full hover:bg-white/20 cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              if (value != "") {
                router.push(`/products/${value}`);
              }
            }}
          >
            <CiSearch className="size-5" />
          </span>
          <span className="absolute justify-center items-center h-full p-1.5 px-2 top-0 left-0 hidden peer-focus:flex">
            <CiSearch className="size-5" />
          </span>
        </form>
        {toolData.activeSearchKeys.length > 0 && isSearchBarFocused && (
          <div className="absolute w-[90%] p-2 top-full left-0 bg-stone-800/90 rounded shadow-lg max-h-[300px] overflow-y-auto z-50">
            {toolData.activeSearchKeys.map((item, index) => (
              <SearchKey key={index} id={item.id} title={item.title} />
            ))}
          </div>
        )}
      </div>
      {isFilterIconVisible && (
        <div className="ml-3 size-12 p-3 rounded-full bg-white/10 hover:bg-white/20 flex justify-center items-center cursor-pointer">
          <FaFilter />
        </div>
      )}
    </div>
  );
}

export default SearchBar;
