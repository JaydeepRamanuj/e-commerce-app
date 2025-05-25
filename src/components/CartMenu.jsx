import { useClerk, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

function CartMenu() {
  const cartData = useSelector((state) => state.cart);
  const router = useRouter();
  const { openSignIn } = useClerk();
  const { isSignedIn } = useUser();
  return (
    <div
      className="relative cursor-pointer w-fit"
      onClick={() => {
        if (isSignedIn) {
          router.push(`/cart/${cartData.cartId}`);
        } else {
          toast.warn("Please sign in to add product to cart");
          openSignIn({ returnBackUrl: window.location.href });
        }
      }}
    >
      <FaShoppingCart className="text-3xl" />
      {cartData.items.length > 0 && (
        <div className="absolute size-4 p-0.5 rounded-full bg-blue-600 text-white text-xs font-semibold flex justify-center items-center -right-1 -top-1 outline-2 outline-sky-300">
          {cartData.items.length}
        </div>
      )}
    </div>
  );
}

export default CartMenu;
