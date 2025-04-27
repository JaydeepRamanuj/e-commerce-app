import { db } from "./setup";
import {
  arrayUnion,
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

async function addProductToWishlist(userId, productData) {
  const userDocRef = doc(db, "users", String(userId));
  console.log("userId", userId);
  console.log("Inside addProductToWishlist()");

  try {
    await updateDoc(userDocRef, {
      wishlist: arrayUnion(productData),
    });
  } catch (error) {
    console.log(error);
  }
}
async function removeProductFromWishlist(userId, productId) {
  const userDocRef = doc(db, "users", String(userId));

  const userSnapshot = await getDoc(userDocRef);
  const userData = userSnapshot.data();

  try {
    if (userData.wishlist) {
      const updatedWishlist = userData.wishlist.filter(
        (product) => product.id !== productId
      );
      await updateDoc(userDocRef, {
        wishlist: updatedWishlist,
      });
    }
  } catch (error) {
    console.log(error);
  }
}

export {
  getProductsFromWishlist,
  addProductToWishlist,
  removeProductFromWishlist,
};
