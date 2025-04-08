function updateTotals(setCartData) {
  const appliedTax = (state.itemTotalVal * state.taxApplicable) / 100;

  setCartData((prev) => ({
    ...prev,
    totalTax: parseFloat(appliedTax.toFixed(2)),
    grandTotal: parseFloat((state.itemTotalVal + appliedTax).toFixed(2)),
  }));
}

async function getCartDetailsHandler() {}
async function addProductToCartHandler({ productData, setCartData }) {
  setCartData((prev) => ({
    itemTotalVal: prev.itemTotalVal + parseFloat(productData.price),
    items: prev.items.push({
      productId: productData.productId,
      price: parseFloat(productData.price),
      title: productData.title,
      img: productData.img,
      quantity: 1,
    }),
    totalTax: 0,
    grandTotal: 0,
  }));
}
async function updateProductToCartHandler() {}
async function removeProductFromCartHandler() {}
async function getProductDetailsHandler() {}
async function getCategoryDetailsHandler() {}
async function getUserDetailsHandler() {}
async function updateUserDetailsHandler() {}
async function addProductToWishlistHandler() {}
async function removeProductFromWishlistHandler() {}
