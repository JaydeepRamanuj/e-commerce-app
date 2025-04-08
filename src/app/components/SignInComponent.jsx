"use client";
import React from "react";

import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";
function SignInComponent() {
  const { user, isSignedIn } = useUser();
  return (
    <div>
      {isSignedIn ? (
        <SignedIn>
          <UserButton />
        </SignedIn>
      ) : (
        <SignedOut>
          <SignInButton>
            <button className="px-3 py-1 rounded text-white bg-slate-600/40  hover:bg-slate-500/40 active:scale-95 cursor-pointer">
              Sign in
            </button>
          </SignInButton>
        </SignedOut>
      )}
    </div>
  );
}

export default SignInComponent;
