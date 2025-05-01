"use client";
import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useRouter } from "next/navigation";
function ErrorPageRoot() {
  const router = useRouter();
  return (
    <div>
      <div className="my-6 h-fit bg-slate-300/10 rounded-md p-3 flex  justify-center items-center gap-3 relative">
        <DotLottieReact
          className="w-full"
          src="https://lottie.host/e3b2f5cf-da38-491d-ab01-19037e8c386e/hZKV4JwSDF.lottie"
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
    </div>
  );
}

export default ErrorPageRoot;
