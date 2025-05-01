import { getAllProducts } from "@/lib/firebase/productServices";

export async function GET(req) {
  console.log("In search page");
  try {
    let products = [];
    // console.log("fetching products");
    products = await getAllProducts();
    return Response.json(products);
  } catch (error) {
    console.log("Error fetching products:", error);
    return new Response("Failed to fetch products", { status: 500 });
  }
}
