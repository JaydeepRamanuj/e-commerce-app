import { useRouter } from "next/navigation";
import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import { useSelector } from "react-redux";

function CartMenu() {
  const cartData = useSelector((state) => state.cart);
  const router = useRouter();
  return (
    <div
      className="relative cursor-pointer w-fit"
      onClick={() => {
        router.push("/cart/1");
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
