import type { UseFormRegister, FieldErrors } from "react-hook-form";
import Input from "../../../../components/ui/Input";
import type { ProductFormInput } from "../../validation/productSchema";

interface Props {
  register: UseFormRegister<ProductFormInput>;
  errors: FieldErrors<ProductFormInput>;
}

const PricingInventorySection = ({ register, errors }: Props) => {
  return (
    <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
      <h2 className="mb-4 font-semibold text-textPrimary">Pricing & Inventory</h2>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="mb-1 block text-sm text-textSecondary">Price *</label>
          <div className="flex items-center rounded-lg border border-gray-200 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary">
            <span className="pl-3 text-textSecondary">$</span>
            <input
              type="number"
              step="0.01"
              placeholder="0.00"
              {...register("price")}
              className="w-full bg-transparent px-2 py-2 outline-none"
            />
          </div>
          <p className="text-sm text-danger">{errors.price?.message}</p>
        </div>

        <div>
          <label className="mb-1 block text-sm text-textSecondary">Stock Quantity *</label>
          <Input type="number" placeholder="e.g. 50" {...register("stock")} className="w-full" />
          <p className="text-sm text-danger">{errors.stock?.message}</p>
        </div>
      </div>
    </div>
  );
};

export default PricingInventorySection;