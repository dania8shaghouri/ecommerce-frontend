import HeroContent from "./HeroContent";
import HeroSlider from "./HeroSlider";

const Hero = () => {
  return (
    <section className="bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-14 lg:py-20">
        <div className="grid lg:grid-cols-2 items-center gap-8 xl:gap-12">
          <HeroContent />

          <div className="w-full min-w-0 lg:translate-x-8">
            <HeroSlider />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
