import { allProducts } from "@/utils/server-side-data-store";
import {
  getAllProducts,
  getHighRatedProducts,
  getProductsByCategory,
  getProductsOnSale,
} from "@/lib/firebase/productServices";

export async function GET(req) {
  const searchParams = req.nextUrl.searchParams;
  console.log(searchParams);

  const type = searchParams.get("type");
  const category = searchParams.get("category");
  const limit = searchParams.get("limit") || 10;
  const rating = searchParams.get("rating");
  const ratinggt = searchParams.get("ratinggt");
  const ratinglt = searchParams.get("ratinglt");
  const sort = searchParams.get("sort");

  let products = await getAllProducts();
  if (type)
    try {
      switch (type) {
        case "high-rated-products":
          products = await getHighRatedProducts();
          break;
        case "products-on-sale":
          products = await getProductsOnSale();
          break;
        default:
          products = await getAllProducts();
          break;
      }
    } catch (error) {
      console.log("Error fetching products:", error);
      return new Response("Something went wrong while fetching product data", {
        status: 500,
      });
    }

  if (category) {
    try {
      products = await getProductsByCategory(category);
    } catch (error) {
      console.log("Error fetching products:", error);
      return new Response("Something went wrong while fetching product data", {
        status: 500,
      });
    }
  }

  let resultingData = products;
  ratinggt &&
    (resultingData = resultingData.filter(
      (product) => product.rating >= parseFloat(ratinggt)
    ));

  ratinglt &&
    (resultingData = resultingData.filter(
      (product) => product.rating <= parseFloat(ratinglt)
    ));

  rating &&
    (resultingData = resultingData.filter(
      (product) => product.rating === parseInt(rating)
    ));
  limit && (resultingData = resultingData.slice(0, parseInt(limit)));
  sort &&
    (sort != "desc"
      ? resultingData.sort((a, b) => a.id - b.id)
      : resultingData.sort((a, b) => b.id - a.id));
  if (resultingData.length > 0) {
    return Response.json(resultingData, { status: 200 });
  } else {
    return new Response("Something went wrong on server side", { status: 500 });
  }
}
