import { getSingleProduct } from "@/lib/firebase/productServices";

export async function GET(_req, { params }) {
  const { productId } = await params;
  try {
    const product = await getSingleProduct(productId);
    console.log("Product in product route ::", product);

    return Response.json(product);
  } catch (error) {
    console.log("Error while fetching product data", error);
    return new Response("Error fetching data", { status: 500 });
  }
}
