import type { UseFormRegister, FieldErrors } from "react-hook-form";
import Input from "../../../../components/ui/Input";
import Textarea from "../../../../components/ui/Textarea";
import type { ProductFormInput } from "../../validation/productSchema";
import type { Category } from "../../../../types/Category";

interface Props {
  register: UseFormRegister<ProductFormInput>;
  errors: FieldErrors<ProductFormInput>;
  categories: Category[];
}

const ProductInfoSection = ({ register, errors, categories }: Props) => {
  return (
    <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
      <h2 className="mb-4 font-semibold text-textPrimary">
        Product Information
      </h2>

      <div className="space-y-4">
        <div>
          <label className="mb-1 block text-sm text-textSecondary">
            Product Name *
          </label>
          <Input
            placeholder="e.g. Novatech Horizon Pro Laptop"
            {...register("title")}
            className="w-full"
          />
          <p className="text-sm text-danger">{errors.title?.message}</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="mb-1 block text-sm text-textSecondary">
              Brand *
            </label>
            <Input
              placeholder="e.g. Novatech"
              {...register("brand")}
              className="w-full"
            />
            <p className="text-sm text-danger">{errors.brand?.message}</p>
          </div>

          <div>
            <label className="mb-1 block text-sm text-textSecondary">
              Category *
            </label>
            <select
              {...register("category")}
              className="w-full rounded-lg border border-gray-200 px-3 py-2 outline-none focus:border-primary focus:ring-2 focus:ring-primary"
            >
              <option value="">Select category</option>
              {categories.map((c) => (
                <option key={c.name} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
            <p className="text-sm text-danger">{errors.category?.message}</p>
          </div>
        </div>

        <div>
          <label className="mb-1 block text-sm text-textSecondary">
            Description
          </label>
          <Textarea
            placeholder="Write a detailed description of the laptop or component..."
            rows={4}
            {...register("description")}
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default ProductInfoSection;
