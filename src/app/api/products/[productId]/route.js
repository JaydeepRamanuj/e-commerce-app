import { getSingleProduct } from "@/lib/firebase/productServices";

export async function GET(_req, { params }) {
  const { productId } = params;
  const product = await getSingleProduct(productId);
  console.log(product);
  return Response.json(product);
}
