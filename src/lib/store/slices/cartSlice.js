import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartId: "",
  userId: "",
  itemTotalVal: 0,
  items: [],
  totalTax: 0,
  grandTotal: 0,
  taxApplicable: 18,
};

function updateTotals(state) {
  const appliedTax = (state.itemTotalVal * state.taxApplicable) / 100;
  state.totalTax = parseFloat(appliedTax.toFixed(2));
  state.grandTotal = parseFloat((state.itemTotalVal + appliedTax).toFixed(2));
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    initializeCart: (state, action) => {
      state.cartId = action.payload.cartId;
      state.userId = action.payload.userId;
      state.itemTotalVal = action.payload.itemTotalVal;
      state.items = action.payload.items;
      state.totalTax = action.payload.totalTax;
      state.grandTotal = action.payload.grandTotal;
    },
    clearCart: (state) => {
      state.cartId = "";
      state.userId = "";
      state.itemTotalVal = 0;
      state.items = [];
      state.totalTax = 0;
      state.grandTotal = 0;
      state.taxApplicable = 18;
    },
    addToCart: (state, action) => {
      state.itemTotalVal += parseFloat(action.payload.price);
      updateTotals(state);
      const existingItem = state.items.find(
        (item) => item.productId === action.payload.productId
      );
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({
          productId: action.payload.productId,
          price: action.payload.price,
          title: action.payload.title,
          img: action.payload.img,
          quantity: 1,
        });
      }
    },
    removeFromCart: (state, action) => {
      const item = state.items.find(
        (item) => item.productId === action.payload
      );
      state.items = state.items.filter(
        (item) => item.productId != action.payload
      );
      state.itemTotalVal -= item.price * item.quantity;
      updateTotals(state);
    },
    increaseProductAmount: (state, action) => {
      const item = state.items.find(
        (item) => item.productId === action.payload
      );
      item.quantity += 1;
      state.itemTotalVal += item.price;
      updateTotals(state);
    },
    decreaseProductAmount: (state, action) => {
      const item = state.items.find(
        (item) => item.productId === action.payload
      );
      item.quantity -= 1;
      state.itemTotalVal -= item.price;
      updateTotals(state);
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseProductAmount,
  decreaseProductAmount,
  initializeCart,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;
