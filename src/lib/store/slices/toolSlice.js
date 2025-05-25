import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  isFilterMenuVisible: false,
  categoryList: [],
  filteredCategoryList: [],
  minProductPrice: 0,
  maxProductPrice: null,
  theme: "dark",
  highRatedItems: [],
  itemsOnSale: [],
  itemListForSearchBar: [],
  activeSearchKeys: [],
  isSidebarVisible: false,
  isPopupVisible: false,
};

const userSlice = createSlice({
  name: "tool",
  initialState,
  reducers: {
    updateLoadingState: (state, action) =>
      (state.isLoading = action.payload || !state.isLoading),
    toggleTheme: (state, action) => !state.theme,
    toggleFilterMenu: (state, action) => !state.isFilterMenuVisible,
    addCategoryToFilter: (state, action) =>
      state.filteredCategoryList.push(action.payload),
    removeCategoryToFilter: (state, action) => {
      state.filteredCategoryList.splice(
        state.filteredCategoryList.indexOf(action.payload),
        1
      );
    },
    setMinPrice: (state, action) => {
      state.minProductPrice = action.payload;
    },
    setMaxPrice: (state, action) => {
      state.maxProductPrice = action.payload;
    },
    setHighRatedItems: (state, action) => {
      state.highRatedItems = action.payload;
    },
    setItemsOnSale: (state, action) => {
      state.itemsOnSale = action.payload;
    },
    setCategoryList: (state, action) => {
      state.categoryList = action.payload;
    },
    setItemListForSearchBar: (state, action) => {
      state.itemListForSearchBar = action.payload;
    },
    setActiveSearchKeys: (state, action) => {
      state.activeSearchKeys = action.payload;
    },
    toggleSidebar: (state) => {
      state.isSidebarVisible = !state.isSidebarVisible;
    },
    togglePopup: (state) => {
      state.isPopupVisible = !state.isPopupVisible;
    },
  },
});

export const {
  toggleFilterMenu,
  setMaxPrice,
  setMinPrice,
  setItemsOnSale,
  setItemListForSearchBar,
  addCategoryToFilter,
  removeCategoryToFilter,
  setActiveSearchKeys,
  toggleSidebar,
  togglePopup,
} = userSlice.actions;
export default userSlice.reducer;
