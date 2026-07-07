import OrbitCarousel from "./OrbitCarousel";

const Categories = () => {
  return (
    <section className="relative py-28 bg-background overflow-hidden">
      {/* Background Blur */}
      <div className="absolute -left-40 top-20 w-[420px] h-[420px] rounded-full bg-primary/10 blur-[120px]" />

      <div className="absolute -right-40 bottom-10 w-[420px] h-[420px] rounded-full bg-sky-300/20 blur-[140px]" />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="max-w-2xl">
          <span className="text-primary font-semibold tracking-[0.25em] uppercase">
            Explore
          </span>

          <h2 className="mt-4 text-5xl lg:text-6xl font-bold text-textPrimary leading-tight">
            Popular Categories
          </h2>

          <p
            className="
    mt-6
    max-w-sm
    text-lg
    text-textSecondary
    leading-8
  "
          >
            Discover our most popular product categories and find exactly what
            you need.
          </p>
        </div>
        <OrbitCarousel />
      </div>
    </section>
  );
};

export default Categories;
