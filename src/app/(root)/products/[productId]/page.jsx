import AddToCartButton from "@/app/components/AddToCartButton";
import CategorySection from "@/app/components/CategorySection";
import CheckoutButton from "@/app/components/CheckoutButton";
import FavoriteIcon from "@/app/components/FavoriteIcon";
import ProductImageContainer from "@/app/components/ProductImageContainer";
import ProductReview from "@/app/components/ProductReview";
import Rating from "@/app/components/Rating";
import Tag from "@/app/components/Tag";
import { sitePath } from "@/app/constants";
import { findDiscountedPrice } from "@/app/utils/helperFunctions";

async function ProductPage({ params }) {
  const { productId } = await params;
  let productData = null;
  try {
    const response = await fetch(`${sitePath}/api/products/${productId}`);
    productData = await response.json();
  } catch (error) {
    console.log("Error in fetching product data:", error);
  }

  return (
    <>
      <div>
        <div className="flex flex-col md:flex-row  flex-wrap">
          <ProductImageContainer productData={productData} />
          <div className="mt-3 lg:mt-0 flex-1 lg:w-1/2 text-gray-300">
            <h3 className="text-sm">Category: {productData?.category}</h3>
            <h3 className="text-sm flex">
              Tags:
              <span className="flex items-center gap-3 pl-3">
                {productData.tags.map((tag, index) => (
                  <Tag title={tag} key={index} />
                ))}
              </span>
            </h3>
            <hr className="w-full my-6  border-gray-400/30" />
            <div className="product-info flex flex-wrap">
              <div className="w-full sm:w-[70%]">
                <h1 className="text-3xl font-semibold">{productData.title}</h1>
                <h4 className="mt-3 flex items-center gap-2">
                  <span>{productData.rating}</span>{" "}
                  <Rating rating={productData.rating} />
                  <span>{productData.ratingCount} ratings</span>
                </h4>
                <h2 className="flex items-end gap-2">
                  <span className="text-orange-400 font-light text-sm ">
                    -{productData.discountPercentage}% off
                  </span>
                  <span className="text-2xl font-semibold">
                    ${" "}
                    {findDiscountedPrice(
                      parseFloat(productData.price),
                      parseFloat(productData.discountPercentage)
                    )}
                  </span>
                  <span className="flex items-center">
                    <span>M.R.P. : </span>
                    <span className="ml-1.5 line-through decoration-gray-200/60">
                      $ {productData.price}
                    </span>
                  </span>
                </h2>
                <div className="my-4 flex gap-4 items-start ">
                  {productData.returnPolicy && (
                    <div className="flex flex-col items-center max-w-[80px] text-center gap-1.5">
                      <span className="h-10 w-10 bg-gray-200 p-1 rounded-full flex justify-center items-center">
                        <img
                          src="/return.png"
                          alt=""
                          className="size-full rounded-full"
                        />
                      </span>
                      <span className="text-sm">
                        {productData.returnPolicy}
                      </span>
                    </div>
                  )}
                  {productData.shippingInformation && (
                    <div className="flex flex-col items-center max-w-[80px] text-center gap-1.5">
                      <span className="h-10 w-10 bg-gray-200 p-1 rounded-full flex justify-center items-center">
                        <img
                          src="/shipping.png"
                          alt=""
                          className="size-full rounded-full"
                        />
                      </span>
                      <span className="text-sm">
                        {productData.shippingInformation}
                      </span>
                    </div>
                  )}
                  {productData.warrantyInformation && (
                    <div className="flex flex-col items-center max-w-[80px] text-center gap-1.5">
                      <span className="h-10 w-10 bg-gray-200 p-1 rounded-full flex justify-center items-center">
                        <img
                          src="/warranty.png"
                          alt=""
                          className="size-full rounded-full"
                        />
                      </span>
                      <span className="text-sm">
                        {productData.warrantyInformation}
                      </span>
                    </div>
                  )}
                  <div className="flex flex-col items-center max-w-[80px] text-center gap-1.5">
                    <span className="h-10 w-10 bg-gray-200 p-1 rounded-full flex justify-center items-center">
                      <img
                        src="cod.png"
                        alt=""
                        className="size-full rounded-full"
                      />
                    </span>
                    <span className="text-sm">cash on delivery</span>
                  </div>
                </div>
              </div>
              <div className="flex-1">
                <FavoriteIcon
                  productObj={{
                    id: productData.id,
                    title: productData.title,
                    price: productData.price,
                    imgUrl: productData.imgUrl,
                    rating: productData.rating,
                    discountPercentage: productData.discountPercentage,
                    ratingCount: productData.ratingCount,
                    availabilityStatus: productData.availabilityStatus,
                  }}
                />
                <div className="mt-3 bg-gray-300/10 p-3 rounded-md">
                  <AddToCartButton id={productData.id} />
                  <CheckoutButton id={productData.id} />
                </div>
              </div>
            </div>

            <hr className="w-full my-6  border-gray-400/30" />
            <div className="">
              <h3 className="font-bold">About this item</h3>
              <h4 className="text-sm mt-3  lg:w-[70%]">
                {productData.description}
              </h4>
            </div>
          </div>
        </div>
        <hr className="w-full my-3  border-gray-400/30" />
        <div>
          <h3 className="font-bold text-xl">Reviews</h3>
          <div>
            {productData.reviews.map((review, index) => (
              <ProductReview
                key={index}
                name={review.reviewerName}
                rating={review.rating}
                review={review.comment}
              />
            ))}
          </div>
        </div>
        <hr className="w-full my-3  border-gray-400/30" />
        <CategorySection
          title="More like this"
          category={productData.category}
          length={4}
        />
      </div>
    </>
  );
}

export default ProductPage;
