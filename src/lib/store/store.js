import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slices/cartSlice";
import userReducer from "./slices/userSlice";
import toolReducer from "./slices/toolSlice";
export const makeStore = () => {
  return configureStore({
    reducer: {
      cart: cartReducer,
      user: userReducer,
      tool: toolReducer,
    },
  });
};
