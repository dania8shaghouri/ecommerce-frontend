import ShopHero from "../../components/shop/hero/ShopHero";
import ShopContent from "../../components/shop/ShopContent";

import ShopFilterProvider from "../../context/shop/ShopFilterProvider";

const ShopPage = () => {
  return (
    <>
      <ShopFilterProvider>
        <ShopHero />
        <ShopContent />
      </ShopFilterProvider>
    </>
  );
};

export default ShopPage;
