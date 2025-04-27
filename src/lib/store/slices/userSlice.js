import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  userId: "",
  username: "",
  cartId: "",
  email: "",
  wishlist: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    initializeUser: (state, action) => {
      if (action.payload) {
        state.userId = action.payload.userId;
        state.username = action.payload.username;
        state.cartId = action.payload.cartId;
        state.email = action.payload.email;
        state.wishlist = action.payload.wishlist;
      }
    },
    addItemToWishlist: (state, action) => {
      if (!state.wishlist.includes(action.payload)) {
        state.wishlist.push(action.payload);
      }
    },
    removeItemFromWishlist: (state, action) => {
      state.wishlist = state.wishlist.filter(
        (item) => item.id != action.payload
      );
    },
  },
});

export const { addItemToWishlist, removeItemFromWishlist, initializeUser } =
  userSlice.actions;
export default userSlice.reducer;
