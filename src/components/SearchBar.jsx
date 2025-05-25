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
  const router = useRouter();
  const pathname = usePathname();

  const toolData = useSelector((state) => state.tool);
  const [inpVal, setInpVal] = useState("");
  const [isSearchBarFocused, setIsSearchBarFocused] = useState(false);

  const isFilterIconVisible =
    pathname.includes("/search") || pathname.includes("/category");

  async function handleFocus() {
    setIsSearchBarFocused(true);
    const productKeyList = await getAllProductNameList();
    dispatch(setItemListForSearchBar(productKeyList));
  }

  function handleBlur() {
    setIsSearchBarFocused(false);
  }

  function handleSearchInput(e) {
    const value = e.target.value;
    setInpVal(value);

    if (value === "") {
      dispatch(setActiveSearchKeys([]));
    } else {
      const filtered = toolData.itemListForSearchBar.filter((item) =>
        item.title.toLowerCase().startsWith(value.toLowerCase())
      );
      dispatch(setActiveSearchKeys(filtered));
    }
  }

  function handleSearchSubmit(e) {
    e.preventDefault();

    console.log(inpVal);
    if (inpVal.trim()) {
      router.push(`/search`);
      setInpVal("");
    }
  }

  return (
    <div className="flex items-center">
      <div className="relative border border-white/20 rounded-full focus-within:border-white/70 transition-colors bg-yellow-600/10 text-yellow-400 border border-yellow-500/30 rounded">
        <form className="flex h-full" onSubmit={handleSearchSubmit}>
          <input
            type="text"
            placeholder="Search"
            value={inpVal}
            onChange={handleSearchInput}
            onFocus={handleFocus}
            onBlur={handleBlur}
            className="bg-transparent text-sm text-white placeholder:text-white/60 px-3 py-1.5 pl-8 rounded-full rounded-r-none outline-none md:w-[400px] transition-all peer"
          />
          <button
            type="submit"
            className="w-10 md:w-14 flex justify-center items-center bg-white/10 hover:bg-white/20 rounded-r-full"
          >
            <CiSearch className="text-white size-5" />
          </button>
          <div className="absolute left-2 top-1/2 -translate-y-1/2 hidden peer-focus:flex items-center text-white/70">
            <CiSearch className="size-5" />
          </div>
        </form>

        {/* Autocomplete dropdown */}
        {isSearchBarFocused && toolData.activeSearchKeys.length > 0 && (
          <div className="absolute z-50 top-full left-0 mt-1 w-[90%] max-h-[300px] bg-stone-900/95 text-white rounded shadow-lg overflow-y-auto">
            {toolData.activeSearchKeys.map((item, index) => (
              <SearchKey key={index} id={item.id} title={item.title} />
            ))}
          </div>
        )}
      </div>

      {isFilterIconVisible && (
        <div
          className="ml-3 size-10 md:size-12 p-2 rounded-full bg-white/10 hover:bg-white/20 flex justify-center items-center cursor-pointer"
          title="Filter"
        >
          <FaFilter className="text-white size-4" />
        </div>
      )}
    </div>
  );
}

export default SearchBar;
