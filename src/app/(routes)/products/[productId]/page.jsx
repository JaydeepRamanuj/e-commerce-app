import AddToCartButton from "@/components/AddToCartButton";
import CategorySection from "@/components/CategorySection";
import BuyNowButton from "@/components/BuyNowButton";
import FavoriteIcon from "@/components/FavoriteIcon";
import ProductImageContainer from "@/components/ProductImageContainer";
import ProductReview from "@/components/ProductReview";
import Rating from "@/components/Rating";
import Tag from "@/components/Tag";
import { findDiscountedPrice } from "@/utils/helperFunctions";

async function ProductPage({ params }) {
  const { productId } = await params;
  let productData = null;
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;
    const response = await fetch(`${baseUrl}/api/products/${productId}`);
    productData = await response.json();
  } catch (error) {
    console.log("Error in fetching product data:", error);
  }

  return (
    <>
      <div className="px-2 lg:px-24 text-yellow-100">
        <div className="flex flex-col md:flex-row flex-wrap gap-6">
          <ProductImageContainer productData={productData} />

          <div className="flex-1 lg:w-1/2 text-yellow-100">
            <h3 className="text-sm text-yellow-400 mb-1">
              Category: {productData?.category}
            </h3>
            <h3 className="text-sm flex items-start gap-2 mb-2">
              <span className="text-yellow-400">Tags:</span>
              <span className="flex flex-wrap gap-2">
                {productData?.tags.map((tag, index) => (
                  <Tag title={tag} key={index} />
                ))}
              </span>
            </h3>

            <hr className="my-4 border-yellow-200/30" />

            <div className="product-info flex flex-wrap">
              <div className="w-full sm:w-[70%]">
                <h1 className="text-3xl font-bold text-yellow-50 mb-2">
                  {productData.title}
                </h1>

                <h4 className="flex items-center gap-2 mb-3">
                  <span>{productData.rating}</span>
                  <Rating rating={productData.rating} />
                  <span>{productData.ratingCount} ratings</span>
                </h4>

                <h2 className="flex items-end gap-2 mb-4">
                  <span className="text-yellow-400 text-sm font-medium">
                    -{productData.discountPercentage}% off
                  </span>
                  <span className="text-2xl font-bold text-yellow-50">
                    $
                    {findDiscountedPrice(
                      parseFloat(productData.price),
                      parseFloat(productData.discountPercentage)
                    )}
                  </span>
                  <span className="flex items-center text-sm">
                    <span className="text-yellow-200/70">M.R.P.:</span>
                    <span className="ml-1.5 line-through decoration-yellow-400/60">
                      $ {productData.price}
                    </span>
                  </span>
                </h2>

                <div className="my-4 flex gap-6 flex-wrap">
                  {productData.returnPolicy && (
                    <div className="flex flex-col items-center text-center max-w-[100px] gap-1.5">
                      <span className="h-12 w-12 bg-yellow-500/20 p-1 rounded-full flex justify-center items-center">
                        <img
                          src="/return.png"
                          alt="return"
                          className="size-full rounded-full"
                        />
                      </span>
                      <span className="text-sm">
                        {productData.returnPolicy}
                      </span>
                    </div>
                  )}
                  {productData.shippingInformation && (
                    <div className="flex flex-col items-center text-center max-w-[100px] gap-1.5">
                      <span className="h-12 w-12 bg-yellow-500/20 p-1 rounded-full flex justify-center items-center">
                        <img
                          src="/shipping.png"
                          alt="shipping"
                          className="size-full rounded-full"
                        />
                      </span>
                      <span className="text-sm">
                        {productData.shippingInformation}
                      </span>
                    </div>
                  )}
                  {productData.warrantyInformation && (
                    <div className="flex flex-col items-center text-center max-w-[100px] gap-1.5">
                      <span className="h-12 w-12 bg-yellow-500/20 p-1 rounded-full flex justify-center items-center">
                        <img
                          src="/warranty.png"
                          alt="warranty"
                          className="size-full rounded-full"
                        />
                      </span>
                      <span className="text-sm">
                        {productData.warrantyInformation}
                      </span>
                    </div>
                  )}
                  <div className="flex flex-col items-center text-center max-w-[100px] gap-1.5">
                    <span className="h-12 w-12 bg-yellow-500/20 p-1 rounded-full flex justify-center items-center">
                      <img
                        src="/cod.png"
                        alt="cash on delivery"
                        className="size-full rounded-full"
                      />
                    </span>
                    <span className="text-sm">Cash on Delivery</span>
                  </div>
                </div>
              </div>

              <div className="flex-1 relative">
                <FavoriteIcon
                  isAbsolute={false}
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

                <div className="mt-3 bg-yellow-500/5 border border-yellow-400/10 p-4 rounded-xl shadow-inner">
                  <AddToCartButton
                    productId={productData.id}
                    title={productData.title}
                    imgUrl={productData.images[0]}
                    price={productData.price}
                    discountPercentage={productData.discountPercentage}
                  />
                  <span className="block my-3"></span>
                  <BuyNowButton
                    productId={productData.id}
                    title={productData.title}
                    imgUrl={productData.images[0]}
                    price={productData.price}
                    discountPercentage={productData.discountPercentage}
                  />
                </div>
              </div>
            </div>

            <hr className="my-6 border-yellow-200/30" />

            <div>
              <h3 className="text-xl font-bold text-yellow-200 mb-2">
                About this item
              </h3>
              <p className="text-sm leading-relaxed lg:w-[70%] text-yellow-100/90">
                {productData.description}
              </p>
            </div>
          </div>
        </div>

        <hr className="w-full my-6 border-yellow-200/30" />

        <div>
          <h3 className="text-xl font-bold text-yellow-200 mb-3">Reviews</h3>
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

        <hr className="w-full my-6 border-yellow-200/30" />

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
