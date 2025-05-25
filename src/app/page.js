import { Suspense } from "react";
import CategorySection from "../components/CategorySection";

export default function Home() {
  return (
    <div className="bg-black min-h-screen">
      <Suspense
        fallback={
          <div className="my-6 min-h-[300px] bg-yellow-900/10 border border-yellow-700/20 rounded-xl p-6 flex flex-col justify-center items-center gap-3">
            <span className="loader"></span>
            <span className="text-yellow-400">Loading Laptops...</span>
          </div>
        }
      >
        <CategorySection title="Laptops" category="laptops" />
      </Suspense>

      <Suspense
        fallback={
          <div className="my-6 min-h-[300px] bg-yellow-900/10 border border-yellow-700/20 rounded-xl p-6 flex flex-col justify-center items-center gap-3">
            <span className="loader"></span>
            <span className="text-yellow-400">
              Loading High rated Products...
            </span>
          </div>
        }
      >
        <CategorySection
          title="High rated Products"
          type="high-rated-products"
        />
      </Suspense>

      <Suspense
        fallback={
          <div className="my-6 min-h-[300px] bg-yellow-900/10 border border-yellow-700/20 rounded-xl p-6 flex flex-col justify-center items-center gap-3">
            <span className="loader"></span>
            <span className="text-yellow-400">Loading Products on sale...</span>
          </div>
        }
      >
        <CategorySection title="Products on sale" type="products-on-sale" />
      </Suspense>

      <Suspense
        fallback={
          <div className="my-6 min-h-[300px] bg-yellow-900/10 border border-yellow-700/20 rounded-xl p-6 flex flex-col justify-center items-center gap-3">
            <span className="loader"></span>
            <span className="text-yellow-400">Loading Smartphones...</span>
          </div>
        }
      >
        <CategorySection title="Smartphone" category="smartphones" />
      </Suspense>
    </div>
  );
}
