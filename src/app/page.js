import { Suspense } from "react";
import CategorySection from "../components/CategorySection";
import CategorySectionWrapper from "@/components/CategorySectionWrapper";

export default function Home() {
  const categories = [
    {
      title: "Laptop",
      category: "laptops",
    },
    {
      title: "High rated Products",
      type: "high-rated-products",
    },
    {
      title: "Products on sale",
      type: "products-on-sale",
    },
    {
      title: "Smartphone",
      category: "smartphones",
    },
  ];

  return (
    <div className="bg-black min-h-screen">
      {categories.map((category, index) => (
        <CategorySectionWrapper
          key={index}
          category={category.category}
          title={category.title}
          type={category.type}
          length={category.length}
        />
      ))}

      {/* <CategorySectionWrapper title="Laptop" category="laptops" />
      <CategorySectionWrapper
        title="High rated Products"
        type="high-rated-products"
      />
      <CategorySectionWrapper
        title="Products on sale"
        type="products-on-sale"
      />
      <CategorySectionWrapper title="Smartphone" category="smartphones" /> */}
    </div>
  );
}
