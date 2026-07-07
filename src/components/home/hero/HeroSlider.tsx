import { Swiper, SwiperSlide } from "swiper/react";

import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import HeroSlide from "./HeroSlide";
import { heroSlides } from "./heroData";

const HeroSlider = () => {
  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      slidesPerView={1}
      loop
      navigation
      pagination={{
        clickable: true,
        enabled: true,
      }}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
      }}
      className="w-full pb-10"
    >
      {heroSlides.map((slide) => (
        <SwiperSlide key={slide.id}>
          <HeroSlide slide={slide} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default HeroSlider;
