import { useShopFilter } from "../../../context/shop/ShopFilterContext";

const MAX_PRICE = 35000;

const PriceFilter = () => {
  const { filters, setPrice } = useShopFilter();

  return (
    <div className="mb-8">
      <h3 className="mb-4 font-semibold">Price</h3>

      <input
        type="range"
        min={0}
        max={MAX_PRICE}
        value={filters.maxPrice ?? MAX_PRICE}
        onChange={(e) => setPrice(0, Number(e.target.value))}
        className="w-full"
      />

      <div className="mt-2 flex justify-between text-sm text-gray-500">
        <span>₺0</span>

        <span>₺{(filters.maxPrice ?? MAX_PRICE).toLocaleString()}</span>
      </div>
    </div>
  );
};

export default PriceFilter;
