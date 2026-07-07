const HeroContent = () => {
  return (
    <div className="space-y-8">
      <span className="inline-flex rounded-full bg-blue-100 text-primary px-4 py-2 text-sm font-medium">
        New Collection
      </span>

      <div className="space-y-5">
        <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
          Next Generation
          <br />
          Technology
        </h1>

        <p className="text-lg text-textSecondary max-w-xl">
          Discover premium laptops, gaming PCs and accessories built for
          performance.
        </p>
      </div>

      <button className="bg-primary hover:bg-primaryHover transition text-white rounded-xl px-8 py-4 font-semibold">
        Shop Now
      </button>
    </div>
  );
};

export default HeroContent;
