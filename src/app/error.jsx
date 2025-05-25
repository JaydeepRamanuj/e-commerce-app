"use client";
import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useRouter } from "next/navigation";
function ErrorPageRoot() {
  const router = useRouter();
  return (
    <div className="my-10 bg-black rounded-xl border border-yellow-500/20 shadow-xl shadow-yellow-500/5 p-6 flex flex-col justify-center items-center relative overflow-hidden text-center text-gray-200">
      <h1 className="text-2xl font-semibold text-yellow-400 mt-4">
        Something went wrong!
      </h1>
      <p className="text-gray-400 mt-2">
        We hit a bump in the system. Try again later.
      </p>

      <button
        onClick={() => {
          router.push("/");
        }}
        className="mt-6 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-2 px-6 rounded shadow-md transition active:scale-95"
      >
        Go to Home
      </button>
    </div>
  );
}

export default ErrorPageRoot;
