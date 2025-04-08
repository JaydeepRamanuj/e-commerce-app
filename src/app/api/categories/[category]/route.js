import { getProductsByCategory } from "@/lib/firebase/productServices";

export async function GET(_req, { params }) {
  const { category } = await params;
  const cartData = await getProductsByCategory(category);
  return Response.json(cartData);
}
