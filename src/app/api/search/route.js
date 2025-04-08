import { getAllProducts } from "@/lib/firebase/productServices";

export async function GET(req) {
  console.log("In search page");
  try {
    let products = [];
    console.log("fetching products");

    if (products.length === 0) {
      products = await getAllProducts();
      return Response.json(products);
    }
  } catch (error) {
    console.log("Error fetching products:", error);
  }
}
