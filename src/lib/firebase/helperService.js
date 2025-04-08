import { getRandomNumberInRange } from "@/app/utils/helperFunctions";
import { updateSinglePropertyOfProduct } from "./productServices";

export function updateDiscountForAllProducts() {
  for (let i = 0; i < 194; i++) {
    updateSinglePropertyOfProduct(
      String(i + 1),
      "discountPercentage",
      String(getRandomNumberInRange(20, 85))
    );
    updateSinglePropertyOfProduct(
      String(i + 1),
      "ratingCount",
      String(getRandomNumberInRange(1, 60))
    );
  }
}
