import type { TopProduct } from "../../types/adminDashboard";
import { getImageUrl } from "../../../../utils/getImageUrl";

interface Props {
  products: TopProduct[];
}

const TopProducts = ({ products }: Props) => {
  return (
    <div className="bg-white border border-border rounded-2xl p-4">
      <h2 className="font-semibold mb-4">Top Products</h2>

      {products.length === 0 ? (
        <p className="text-sm text-textSecondary">No sales yet.</p>
      ) : (
        <>
          <div className="grid grid-cols-3 font-semibold text-gray-500 border-b pb-2 mb-3 text-xs uppercase">
            <span>Product</span>
            <span className="text-center">Units Sold</span>
            <span className="text-right">Revenue</span>
          </div>

          <div className="space-y-3">
            {products.map((p, index) => (
              <div
                key={`${p.title}-${index}`}
                className="grid grid-cols-3 items-center text-sm"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={getImageUrl(p.image)}
                    alt={p.title}
                    className="w-9 h-9 rounded-lg border border-border object-contain p-0.5"
                  />
                  <span className="font-medium">{p.title}</span>
                </div>
                <div className="text-center text-gray-700">{p.unitsSold}</div>
                <div className="text-right font-medium">
                  ${p.revenue.toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default TopProducts;
