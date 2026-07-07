import FilterSidebar from "./filters/FilterSidebar";
import ProductSection from "./ProductSection";

const ShopContent = () => {
  return (
    <section className="container mx-auto px-4 py-10">
      <div className="flex flex-col gap-8 lg:flex-row">
        <FilterSidebar />

        <div className="flex-1">
          <ProductSection />
        </div>
      </div>
    </section>
  );
};

export default ShopContent;
