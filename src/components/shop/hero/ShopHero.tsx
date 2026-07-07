import ShopHeroContent from "./ShopHeroContent";
import ShopHeroImage from "./ShopHeroImage";

const ShopHero = () => {
  return (
    <section className="container mx-auto px-4 mt-8">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-950 via-slate-900 to-blue-950 min-h-[260px] flex items-center">
        <ShopHeroContent />

        <ShopHeroImage />
      </div>
    </section>
  );
};

export default ShopHero;