import {
  doc,
  getDocs,
  collection,
  setDoc,
  deleteDoc,
  updateDoc,
  arrayUnion,
  getDoc,
} from "firebase/firestore";
import { db } from "./setup";
import { Zen_Loop } from "next/font/google";

// async function getAllProductsFromCart(userId) {
//   try {
//     const cartCollection = collection(db, `users/${userId}/cart`);
//     const querySnapshot = await getDocs(cartCollection);
//     const products = querySnapshot.docs.map((product) => ({
//       ...product.data(),
//     }));

//     console.log(products);
//     return products;
//   } catch (error) {
//     console.log(error);
//   }
// }
export async function getCartData(cartId) {
  try {
    const cartRef = doc(db, "cart", String(cartId));
    const cartSnapshot = await getDoc(cartRef);
    const cartData = cartSnapshot.data();
    // console.log("cartData::", cartData);
    return cartData;
  } catch (error) {
    console.log(error);
  }
}

// async function addProductToCart(userId, productDetails) {
//   try {
//     const ref = doc(db, `users/${userId}/cart`, String(productDetails.id));
//     setDoc(ref, productDetails);
//   } catch (error) {
//     console.log(error);
//   }
// }

// async function addProductToCart(cartId, productDetails) {
//   try {
//     const ref = doc(db, `cart`, cartId);
//     setDoc(ref, productDetails);
//     return true;
//   } catch (error) {
//     console.log(error);
//     return false;
//   }
// }

// async function removeProductFromCart(userId, productId) {
//   try {
//     const ref = doc(db, `users/${userId}/cart`, String(productId));
//     await deleteDoc(ref, String(productId));
//   } catch (error) {
//     console.log(error);
//   }
// }
async function removeProductFromCart(cartId, productId) {
  try {
    const ref = doc(db, `cart`, cartId);
    await deleteDoc(ref, String(productId));
  } catch (error) {
    console.log(error);
  }
}

// export async function initializeCart(cartId) {}
export async function addProductToCart(cartId, cartObj) {
  try {
    const cartRef = doc(db, "cart", cartId);
    // const cartSnapshot = await getDoc(cartRef);
    // const cartData = cartSnapshot.data();
    // const items = cartData.items || [];

    // const existingProductIndex = items.findIndex(
    //   (item) => item.productId === productDetails.productId
    // );
    // if (existingProductIndex !== -1) {
    //   items[existingProductIndex].quantity += 1;
    // } else {
    //   items.push({
    //     productId: productDetails.productId,
    //     price: parseFloat(productDetails.price),
    //     title: productDetails.title,
    //     img: productDetails.img,
    //     quantity: 1,
    //   });
    // }
    setDoc(cartRef, cartObj);
    // await updateDoc(cartRef, cartObj);
    return true;
  } catch (error) {
    console.log("Error while adding product to cart", error);
    return false;
  }
}
// export async function removeProductToCart(productId) {}
// export async function increaseProductQuantity(productId) {}
// export async function decreaseProductQuantity(productId) {}
export async function setCart(cartData) {
  try {
    const cartRef = doc(db, "cart", cartData.cartId);
    setDoc(cartRef, cartData);
    return true;
  } catch (error) {
    console.log("Error while adding product to cart", error, message);
    return false;
  }
}
export async function updateCart(cartId, cartObj) {
  try {
    const cartRef = doc(db, "cart", cartId);
    // console.log("from firebase fn: ", cartObj);
    await updateDoc(cartRef, cartObj);
    return true;
  } catch (error) {
    console.log("Error while updating product to cart", error.message);
    return false;
  }
}

// export { getCartData as getCartData, addProductToCart, removeProductFromCart };
