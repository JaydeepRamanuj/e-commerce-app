import { db } from "./setup";
import {
  arrayUnion,
  arrayRemove,
  query,
  getDoc,
  doc,
  getDocs,
  collection,
  where,
  updateDoc,
} from "firebase/firestore";
async function getProductsFromWishlist(userId) {
  try {
    const userDocRef = doc(db, "users", String(userId));
    const userSnapShot = await getDoc(userDocRef);
    const wishlist = userSnapShot.data().wishlist;
    // console.log(wishlist);

    const productRef = collection(db, "products");
    const q = query(productRef, where("id", "in", wishlist));

    const productSnapshot = await getDocs(q);
    // console.log(productSnapshot);

    const products = productSnapshot.docs.map((product) => product.data());

    // console.log(products);
    return products;
  } catch (error) {
    console.log(error);
  }
}

async function addProductToWishlist(userId, productId) {
  const userDoc = doc(db, "users", String(userId));
  try {
    await updateDoc(userDoc, {
      wishlist: arrayUnion(productId),
    });
  } catch (error) {
    console.log(error);
  }
}
async function removeProductFromWishlist(userId, productId) {
  const userDoc = doc(db, "users", String(userId));
  try {
    await updateDoc(userDoc, {
      wishlist: arrayRemove(productId),
    });
  } catch (error) {
    console.log(error);
  }
}

export {
  getProductsFromWishlist,
  addProductToWishlist,
  removeProductFromWishlist,
};
