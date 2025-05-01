import { Suspense } from "react";
import CategorySection from "../components/CategorySection";

export default function Home() {
  return (
    <div className="">
      <Suspense
        fallback={
          <div className="my-6 min-h-[300px] bg-slate-300/10 rounded-md p-3 flex flex-col justify-center items-center gap-3">
            <span className="loader"></span>
            <span>Loading Laptops...</span>
          </div>
        }
      >
        <CategorySection title="Laptops" category="laptops" />
      </Suspense>
      <Suspense
        fallback={
          <div className="my-6 min-h-[300px] bg-slate-300/10 rounded-md p-3 flex flex-col justify-center items-center gap-3">
            <span className="loader"></span>
            <span>Loading High rated Products...</span>
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
          <div className="my-6 min-h-[300px] bg-slate-300/10 rounded-md p-3 flex flex-col justify-center items-center gap-3">
            <span className="loader"></span>
            <span>Loading Products on sale...</span>
          </div>
        }
      >
        <CategorySection title="Products on sale" type="products-on-sale" />
      </Suspense>

      <Suspense
        fallback={
          <div className="my-6 min-h-[300px] bg-slate-300/10 rounded-md p-3 flex flex-col justify-center items-center gap-3">
            <span className="loader"></span>
            <span>Loading Smartphones...</span>
          </div>
        }
      >
        <CategorySection title="Smartphone" category="smartphones" />
      </Suspense>
    </div>
  );
}
