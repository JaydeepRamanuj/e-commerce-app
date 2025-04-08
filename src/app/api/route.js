import {
  getAllProducts,
  getHighRatedProducts,
  getProductsOnSale,
} from "@/lib/firebase/productServices";

export async function GET(req) {
  //   const searchParams = req.nextUrl.searchParams;
  //   const type = searchParams.get("type");
  //   let products = [];
  //   try {
  //     switch (type) {
  //       case "high-rated-products":
  //         products = await getHighRatedProducts();
  //         break;
  //       case "products-on-sale":
  //         products = await getProductsOnSale();
  //         break;
  //       default:
  //         products = await getAllProducts();
  //         break;
  //     }
  //   } catch (error) {
  //     console.log("Error fetching products:", error);
  //   }
  //   return Response.json(products);
}
