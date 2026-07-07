import img from "../../../../../backend/src/images/img2.webp.jpg";
const ShopHeroImage = () => {
  return (
    <div className="hidden lg:flex absolute right-0 bottom-0 h-full w-1/2 items-end justify-end">
      <img src={img} alt="Gaming Setup" className="h-full object-cover" />
    </div>
  );
};

export default ShopHeroImage;
