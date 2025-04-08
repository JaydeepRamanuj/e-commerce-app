import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  userId: "",
  username: "",
  email: 0,
  isLoggedIn: 0,
  wishlist: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
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

export const { addItemToWishlist, removeItemFromWishlist } = userSlice.actions;
export default userSlice.reducer;
