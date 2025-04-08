"use client";
import CartTableItem from "@/app/components/CartTableItem";
import { useBreakpoint } from "@/app/hooks/useBreakpoint";
import { useSelector } from "react-redux";

function CartPage() {
  const cartData = useSelector((state) => state.cart);
  const breakpoint = useBreakpoint();
  return (
    <div>
      <h1 className="text-xl font-bold my-6 text-center">
        Your Cart and Checkout
      </h1>
      <div className="flex flex-col lg:flex-row  justify-between gap-6 flex-wrap">
        <div className="flex-1 lg:w-[65%]">
          {breakpoint > 640 && (
            <ul className="flex p-2 rounded bg-gray-200/10">
              <li className="flex-1 text-center">Item</li>
              <li className="flex-1 text-center">Price</li>
              <li className="flex-1 text-center">Quantity</li>
              <li className="flex-1 text-center">Total</li>
            </ul>
          )}
          <div className="mt-3">
            {cartData.items.map((item, index) => (
              <CartTableItem
                key={index}
                id={item.productId}
                image={item.img}
                name={item.title}
                price={item.price}
                productQuantity={item.quantity}
              />
            ))}
          </div>
        </div>
        <div className="flex-1 bg-gray-200/10 rounded-md p-4 h-fit flex flex-col justify-center">
          <h4 className="p-2 border-b border-gray-200/20 flex justify-between">
            <span>SubTotal :</span> <span>$ {cartData.itemTotalVal}</span>
          </h4>
          <h4 className="p-2 border-b border-gray-200/20 flex justify-between">
            <span>Sales Tax ({cartData.taxApplicable}) :</span>{" "}
            <span>$ {cartData.totalTax}</span>
          </h4>
          <h4 className="p-2 border-b border-gray-200/20 flex justify-between items-center">
            <span>Grand Total :</span>
            <span className="text-3xl">$ {cartData.grandTotal}</span>
          </h4>

          <div className="mt-10 p-2 text-center text-white text-xl bg-gray-200/30 hover:bg-gray-200/50 rounded cursor-pointer">
            Checkout
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
