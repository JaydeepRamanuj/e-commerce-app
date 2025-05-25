"use client";
import React, { use, useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import { FiMinus } from "react-icons/fi";
import { IoMdAdd } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { updateCartAsync } from "@/lib/store/async/cartAsyncThunk";
import { useRouter } from "next/navigation";
import { useBreakpoint } from "../hooks/useBreakpoint";
import ConfirmDeletePopup from "./ConfirmDeletePopup";
function CartTableItem({ id, name, image, price, productQuantity }) {
  const [quantity, setQuantity] = useState(parseFloat(productQuantity));
  const cartData = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const route = useRouter();
  const breakpoint = useBreakpoint();
  const [isPopupVisible, setPopupVisible] = useState(false);
  const handleQuantityChange = (type) => {
    setQuantity(type == "increase" ? quantity + 1 : quantity - 1);
    dispatch(
      updateCartAsync({
        cartId: cartData.cartId,
        productId: id,
        type:
          type === "increase"
            ? "increaseProductAmount"
            : "decreaseProductAmount",
      })
    );
  };

  const handleRemove = () => {
    setPopupVisible(true);
  };

  return (
    <>
      {breakpoint < 640 ? (
        <div className="mt-2 flex items-center  max-w-[350px] mx-auto bg-black/30 hover:bg-yellow-400/10 p-3 rounded-lg border border-yellow-400/20 shadow-md">
          <div
            className="w-[40%] cursor-pointer"
            onClick={() => {
              route.push(`/products/${id}`);
            }}
          >
            <img
              src={image}
              alt=""
              className="w-full h-full object-cover rounded-md"
            />
          </div>
          <div className="flex flex-col gap-2 text-yellow-100 flex-1 px-2">
            <span
              className="cursor-pointer"
              onClick={() => {
                route.push(`/products/${id}`);
              }}
            >
              {name}
            </span>
            <div className="flex items-center">
              <span
                className="border border-r-0 border-yellow-400 text-yellow-300 rounded-l-md h-8 w-8 flex justify-center items-center hover:bg-yellow-300/20 cursor-pointer active:scale-95"
                onClick={() => {
                  handleQuantityChange("increase");
                }}
              >
                <IoMdAdd />
              </span>
              <span className="border border-yellow-400 h-8 w-10 flex justify-center items-center">
                {quantity}
              </span>
              <span
                className="border border-l-0 border-yellow-400 text-yellow-300 rounded-r-md h-8 w-8 flex justify-center items-center hover:bg-yellow-300/20 cursor-pointer active:scale-95"
                onClick={() => {
                  handleQuantityChange();
                }}
              >
                <FiMinus />
              </span>
            </div>
            <div className="flex items-center justify-between text-sm font-semibold text-yellow-200">
              <span>$ {parseInt(price) * parseInt(quantity)}</span>
              <MdDeleteForever
                className="text-xl cursor-pointer hover:text-red-400 active:scale-95"
                onClick={handleRemove}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center bg-black/30 hover:bg-yellow-400/10 p-3 rounded-lg border border-yellow-400/20 shadow-md text-yellow-100">
          <div
            className="flex-1 flex items-center justify-start gap-3 hover:bg-yellow-200/10 rounded p-1 cursor-pointer active:scale-[0.99]"
            onClick={() => {
              route.push(`/products/${id}`);
            }}
          >
            <img src={image} alt="" className="size-10 rounded" />
            <span className="line-clamp-1">{name}</span>
          </div>

          <div className="flex-1 text-center">${price}</div>

          <div className="flex-1 flex justify-center items-center">
            <span
              className="border border-r-0 border-yellow-400 text-yellow-300 rounded-l-md h-8 w-8 flex justify-center items-center hover:bg-yellow-300/20 cursor-pointer active:scale-95"
              onClick={() => {
                handleQuantityChange("increase");
              }}
            >
              <IoMdAdd />
            </span>
            <span className="border border-yellow-400 h-8 w-10 flex justify-center items-center">
              {quantity}
            </span>
            <span
              className="border border-l-0 border-yellow-400 text-yellow-300 rounded-r-md h-8 w-8 flex justify-center items-center hover:bg-yellow-300/20 cursor-pointer active:scale-95"
              onClick={() => {
                handleQuantityChange();
              }}
            >
              <FiMinus />
            </span>
          </div>

          <div className="flex-1 flex items-center justify-center text-center">
            <span className="ml-auto">
              ${parseInt(price) * parseInt(quantity)}
            </span>
            <MdDeleteForever
              className="ml-auto text-xl cursor-pointer hover:text-red-400 active:scale-95"
              onClick={handleRemove}
            />
          </div>
        </div>
      )}
      {isPopupVisible && (
        <ConfirmDeletePopup
          productTitle={name}
          setPopupVisible={setPopupVisible}
          cartId={cartData.cartId}
          productId={id}
        />
      )}
    </>
  );
}

export default CartTableItem;
