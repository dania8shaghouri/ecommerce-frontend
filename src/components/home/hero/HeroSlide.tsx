import { useNavigate } from "react-router-dom";
import type { HeroSlideType } from "./heroData";

interface Props {
  slide: HeroSlideType;
}

const HeroSlide = ({ slide }: Props) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/product/${slide.id}`)}
      className="
   relative
      flex
      justify-center
      items-center
      min-h-[420px]
      lg:min-h-[520px]
      cursor-pointer
"
    >
      <img
        src={slide.image}
        alt={slide.title}
        className="
      w-full
      max-w-[760px]
      lg:max-w-[820px]
      xl:max-w-[900px]
      object-contain
      transition-transform
      duration-500
      hover:scale-105
      select-none
      rounded-md
    "
        draggable={false}
      />
    </div>
  );
};

export default HeroSlide;
