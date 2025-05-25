import { updateCartAsync } from "@/lib/store/async/cartAsyncThunk";
import { togglePopup } from "@/lib/store/slices/toolSlice";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
export default function ConfirmDeletePopup({
  productTitle,
  setPopupVisible,
  cartId,
  productId,
}) {
  const ref = useRef();

  const handleClickOutside = (e) => {
    if (ref.current && !ref.current.contains(e.target)) {
      setPopupVisible(false);
    }
  };

  const handleEscape = (e) => {
    if (e.key === "Escape") {
      setPopupVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const dispatch = useDispatch();
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <div
        ref={ref}
        className=" bg-black border border-yellow-500/20 shadow-lg shadow-yellow-500/10 p-6 rounded-lg w-[90%] max-w-md text-yellow-100 text-center space-y-4"
      >
        <h2 className="text-xl font-semibold text-yellow-300">
          Confirm Deletion
        </h2>
        <p className="text-sm">
          Are you sure you want to delete{" "}
          <span className="text-yellow-400 font-medium">"{productTitle}"</span>{" "}
          from your cart?
        </p>
        <div className="flex justify-center gap-4 pt-2">
          <button
            onClick={() => {
              dispatch(
                updateCartAsync({
                  cartId: cartId,
                  productId: productId,
                  type: "removeFromCart",
                })
              );
              setPopupVisible(false);
            }}
            className="bg-yellow-400/20 hover:bg-yellow-400/40 text-yellow-100 px-4 py-2 rounded-md transition"
          >
            Yes, Delete
          </button>
          <button
            onClick={() => {
              setPopupVisible(false);
            }}
            className="bg-white/10 hover:bg-white/20 text-yellow-200 px-4 py-2 rounded-md transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
