"use client";
import React, { use, useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import { FiMinus } from "react-icons/fi";
import { IoMdAdd } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { updateCartAsync } from "@/lib/store/async/cartAsyncThunk";
import { useRouter } from "next/navigation";
import { useBreakpoint } from "../hooks/useBreakpoint";
function CartTableItem({ id, name, image, price, productQuantity }) {
  const [quantity, setQuantity] = useState(parseFloat(productQuantity));
  const cartData = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const route = useRouter();
  const breakpoint = useBreakpoint();
  return (
    <>
      {breakpoint < 640 ? (
        <div className="mt-2 flex max-w-[350px] mx-auto  bg-gray-600/10 hover:bg-gray-400/10 p-2 rounded pt-3 border-t border-gray-200/30">
          <div className="w-[40%]">
            <img
              src={image}
              alt=""
              className="w-full h-full object-cover rounded"
            />
          </div>
          <div className="flex flex-col gap-2">
            <span className="">{name}</span>
            <div className="flex-1 flex items-center">
              <span
                className="border border-r-0 rounded-r-none  rounded h-8 w-8 flex justify-center items-center hover:bg-white/30 cursor-pointer active:scale-95"
                onClick={() => {
                  setQuantity(quantity + 1);
                  dispatch(
                    updateCartAsync({
                      cartId: cartData.cartId,
                      productId: id,
                      type: "increaseProductAmount",
                    })
                  );
                }}
              >
                <IoMdAdd />
              </span>
              <span className="border h-8 w-10 flex justify-center items-center">
                {quantity}
              </span>
              <span
                className="border border-l-0 rounded-l-none  rounded h-8 w-8 flex justify-center items-center hover:bg-white/30 cursor-pointer active:scale-95"
                onClick={() => {
                  setQuantity(quantity - 1);
                  dispatch(
                    updateCartAsync({
                      cartId: cartData.cartId,
                      productId: id,
                      type: "decreaseProductAmount",
                    })
                  );
                }}
              >
                <FiMinus />
              </span>
            </div>
            <div className="flex-1 flex items-center justify-center text-center">
              <span className="">$ {parseInt(price) * parseInt(quantity)}</span>
              <MdDeleteForever
                className="ml-auto text-xl cursor-pointer hover:text-red-400 active:scale-95"
                onClick={() => {
                  dispatch(
                    updateCartAsync({
                      cartId: cartData.cartId,
                      productId: id,
                      type: "removeFromCart",
                    })
                  );
                }}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className=" flex items-center bg-gray-600/10 hover:bg-gray-400/10 p-2 rounded pt-3 border-t border-gray-200/30">
          <div
            className="flex-1 flex items-center justify-start gap-3 hover:bg-gray-200/10 rounded p-1 cursor-pointer active:scale-[0.99] "
            onClick={() => {
              route.push(`/products/${id}`);
            }}
          >
            <img src={image} alt="" className="size-10 rounded" />
            <span className="line-clamp-1">{name}</span>
          </div>
          <div className="flex-1 text-center">{`$ ${price}`}</div>
          <div className="flex-1 flex justify-center items-center">
            <span
              className="border border-r-0 rounded-r-none  rounded h-8 w-8 flex justify-center items-center hover:bg-white/30 cursor-pointer active:scale-95"
              onClick={() => {
                setQuantity(quantity + 1);
                dispatch(
                  updateCartAsync({
                    cartId: cartData.cartId,
                    productId: id,
                    type: "increaseProductAmount",
                  })
                );
              }}
            >
              <IoMdAdd />
            </span>
            <span className="border h-8 w-10 flex justify-center items-center">
              {quantity}
            </span>
            <span
              className="border border-l-0 rounded-l-none  rounded h-8 w-8 flex justify-center items-center hover:bg-white/30 cursor-pointer active:scale-95"
              onClick={() => {
                setQuantity(quantity - 1);
                dispatch(
                  updateCartAsync({
                    cartId: cartData.cartId,
                    productId: id,
                    type: "decreaseProductAmount",
                  })
                );
              }}
            >
              <FiMinus />
            </span>
          </div>
          <div className="flex-1 flex items-center justify-center text-center">
            <span className="ml-auto">
              $ {parseInt(price) * parseInt(quantity)}
            </span>
            <MdDeleteForever
              className="ml-auto text-xl cursor-pointer hover:text-red-400 active:scale-95"
              onClick={() => {
                dispatch(
                  updateCartAsync({
                    cartId: cartData.cartId,
                    productId: id,
                    type: "removeFromCart",
                  })
                );
              }}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default CartTableItem;
