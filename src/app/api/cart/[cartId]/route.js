import { updateCart } from "@/lib/firebase/cartServices";

export async function GET(_req, { params }) {
  const { cartId } = await params;
  const cartData = getCartData(cartId);
  return Response.json(data);
}

export async function POST(req) {
  const { cartId, cartData } = await req.json();
  const response = updateCart(cartId, cartData);
  if (response) {
    return new Response("Added", {
      status: 200,
    });
  } else {
    return new Response("Error updating cart", {
      status: 500,
    });
  }
}

export async function DELETE(_req, { params }) {
  const { cartId } = await params;
  const cityIndex = cities.findIndex((city) => city.id === parseInt(cityId));
  const deletedComment = cities[cityIndex];
  if (cityIndex != -1) cities.splice(cityIndex, 1);
  return Response.json(deletedComment);
}
