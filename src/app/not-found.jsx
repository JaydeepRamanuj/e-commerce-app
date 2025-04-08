"use client";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import React from "react";
import { useRouter } from "next/navigation";
function PageNotFoundRootLevel() {
  const router = useRouter();
  return (
    <div className="my-6 max-h-[300px] bg-slate-300/10 rounded-md p-3 flex  justify-center items-center gap-3 relative">
      <DotLottieReact
        className="w-full h-full"
        src="https://lottie.host/3e74a6c2-85f0-437c-8fe5-3450ca8cddc9/lo4KwWU9gy.lottie"
        loop
        autoplay
      />
      <button
        className="absolute bottom-10 left-1/2 -translate-x-1/2 bg-stone-600 text-white rounded-md w-fit mx-auto py-2 px-4 cursor-pointer hover:bg-stone-700 active:scale-95"
        onClick={() => router.push("/")}
      >
        Go to Home
      </button>
    </div>
  );
}

export default PageNotFoundRootLevel;
