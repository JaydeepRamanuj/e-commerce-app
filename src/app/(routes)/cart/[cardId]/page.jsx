"use client";
import CartTableItem from "@/components/CartTableItem";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

function CartPage() {
  const cartData = useSelector((state) => state.cart);
  const breakpoint = useBreakpoint();
  return (
    <div>
      <h1 className="text-xl font-bold my-6 text-center text-yellow-400">
        Your Cart and Checkout
      </h1>
      <div className="flex flex-col lg:flex-row justify-between gap-6 flex-wrap">
        <div className="flex-1 lg:w-[65%]">
          {breakpoint > 640 && (
            <ul className="flex p-2 rounded bg-black/30 text-yellow-400 font-semibold border border-yellow-400/20">
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

        <div className="w-full lg:max-w-[35%] flex-1 bg-black/40 border border-yellow-400/20 rounded-md p-4 h-fit flex flex-col justify-center shadow-xl shadow-yellow-400/10">
          <h4 className="p-2 border-b border-yellow-400/10 flex justify-between text-yellow-200">
            <span>SubTotal :</span> <span>$ {cartData.itemTotalVal}</span>
          </h4>
          <h4 className="p-2 border-b border-yellow-400/10 flex justify-between text-yellow-200">
            <span>Sales Tax ({cartData.taxApplicable}%) :</span>
            <span>$ {cartData.totalTax}</span>
          </h4>
          <h4 className="p-2 border-b border-yellow-400/10 flex justify-between items-center text-yellow-300 font-semibold">
            <span>Grand Total :</span>
            <span className="text-3xl">$ {cartData.grandTotal}</span>
          </h4>

          <div
            className="mt-10 p-2 text-center text-black font-semibold text-lg bg-yellow-400 hover:bg-yellow-300 active:scale-95 rounded cursor-pointer transition"
            onClick={() => {
              toast.info(
                "🔐 Authentication and product display are the focus of this demo. Checkout functionality is not active for demonstration purposes."
              );
            }}
          >
            Checkout
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
