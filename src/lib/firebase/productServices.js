import { allProducts } from "@/utils/server-side-data-store";
import { db, productsCollection } from "./setup";
import {
  query,
  getDoc,
  doc,
  getDocs,
  where,
  updateDoc,
  setDoc,
  collection,
} from "firebase/firestore";

async function getAllProducts() {
  try {
    const querySnapshot = await getDocs(productsCollection);
    const products = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return products;
  } catch (error) {
    console.log("Error fetching all products:", error);
    return new Response("Something went wrong while fetching product data", {
      status: 500,
    });
  }
}
async function getProductsOfSpecificCategory(category) {
  try {
    const q = query(productsCollection, where("category", "==", category));
    const querySnapshot = await getDocs(q);
    const products = querySnapshot.docs.map((product) => ({
      ...product.data(),
    }));

    return products;
  } catch (error) {
    console.log("Error fetching products by category", error);
    return new Response("Something went wrong while fetching product data", {
      status: 500,
    });
  }
}

async function getSingleProduct(id) {
  try {
    const productRef = doc(db, "products", id);
    const productSnapshot = await getDoc(productRef);

    const product = productSnapshot.data();
    return product;
  } catch (error) {
    console.log("Error fetching product:", error);
    return new Response("Something went wrong while fetching product data", {
      status: 500,
    });
  }
}

async function uploadProduct(product) {
  try {
    const productRef = doc(db, "products", String(product.id));
    setDoc(productRef, product);
  } catch (error) {
    console.log(error);
  }
}

async function updateProduct(id, updatedProduct) {
  try {
    const productRef = doc(db, "products", id);
    await updateDoc(productRef, updatedProduct);
  } catch (error) {
    console.log(error);
  }
}

export async function updateAllProducts() {
  const querySnapshot = await getDocs(productsCollection);

  const products = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  products.map(async (product) => {
    updateSinglePropertyOfProduct(
      product.id,
      "discountPercentage",
      parseFloat(product.discountPercentage),
      "ratingCount",
      parseFloat(product.ratingCount)
    );
  });
}

async function updateSinglePropertyOfProduct(id, prop1, val1, prop2, val2) {
  try {
    const productRef = doc(db, "products", String(id));

    await updateDoc(productRef, { [prop1]: val1, [prop2]: val2 });
    // console.log(`Updated product ${id}`);
    return true;
  } catch (error) {
    console.error("Update failed:", error);
    return false;
  }
}

export async function getProductsByCategory(category) {
  let products = [];
  try {
    const productsRef = collection(db, "products");
    const q = query(productsRef, where("category", "==", category));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      products.push({ id: doc.id, ...doc.data() });
    });
    // console.log("products ::", products);
  } catch (error) {
    console.error("Error getting products by category:", error);
    return new Response("Something went wrong while fetching product data", {
      status: 500,
    });
  }
  return products;
}

export async function getProductsOnSale() {
  let products = [];
  try {
    const productsRef = collection(db, "products");
    const q = query(productsRef, where("discountPercentage", ">=", 60));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      products.push({ id: doc.id, ...doc.data() });
    });
    // console.log("products ::", products);
  } catch (error) {
    console.error("Error getting products on sale:", error);
    return new Response("Something went wrong while fetching product data", {
      status: 500,
    });
  }
  return products;
}

export async function getHighRatedProducts() {
  let products = [];
  try {
    const productsRef = collection(db, "products");
    const q = query(productsRef, where("rating", ">=", 4.5));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      products.push({ id: doc.id, ...doc.data() });
    });
    // console.log("products ::", products);
  } catch (error) {
    console.error("Error getting High rated products:", error);
    return new Response("Something went wrong while fetching product data", {
      status: 500,
    });
  }
  return products;
}

export async function getAllProductNameList() {
  let productNameList = [];
  try {
    const productsRef = collection(db, "products");
    const querySnapshot = await getDocs(productsRef);
    querySnapshot.forEach((doc) => {
      productNameList.push({ id: doc.id, title: doc.data().title });
    });
    // console.log("productNameList ::", productNameList);
    return productNameList;
  } catch (error) {
    console.error("Error getting High rated products:", error);
    return new Response("Something went wrong while fetching product data", {
      status: 500,
    });
  }
  return productNameList;
}

export {
  getAllProducts,
  getProductsOfSpecificCategory,
  getSingleProduct,
  updateProduct,
  uploadProduct,
  updateSinglePropertyOfProduct,
};
