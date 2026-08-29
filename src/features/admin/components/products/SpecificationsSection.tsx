import type { UseFormRegister } from "react-hook-form";
import Input from "../../../../components/ui/Input";
import type { ProductFormInput } from "../../validation/productSchema";

interface Props {
  register: UseFormRegister<ProductFormInput>;
  category: string;
}

const FieldRow = ({
  register,
  name,
  label,
  placeholder,
  hint,
}: {
  register: UseFormRegister<ProductFormInput>;
  name: keyof ProductFormInput;
  label: string;
  placeholder: string;
  hint?: string;
}) => (
  <div>
    <label className="mb-1 block text-sm text-textSecondary">{label}</label>
    <Input placeholder={placeholder} {...register(name)} className="w-full" />
    {hint && <p className="mt-1 text-xs text-textSecondary/70">{hint}</p>}
  </div>
);

const SpecificationsSection = ({ register, category }: Props) => {
  if (category === "Laptops") {
    return (
      <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
        <h2 className="mb-4 font-semibold text-textPrimary">Specifications</h2>
        <div className="grid grid-cols-2 gap-4">
          <FieldRow
            register={register}
            name="cpu"
            label="CPU"
            placeholder="e.g. Intel Core i7-13700K"
            hint="Specify family and clock speed"
          />
          <FieldRow
            register={register}
            name="ram"
            label="RAM"
            placeholder="e.g. 16GB DDR5 4800MHz"
            hint="Total system capacity and technology"
          />
          <FieldRow
            register={register}
            name="storage"
            label="Storage"
            placeholder="e.g. 1TB NVMe PCIe 4.0 SSD"
            hint="Capacity type and controller details"
          />
          <FieldRow
            register={register}
            name="gpu"
            label="GPU"
            placeholder="e.g. NVIDIA GeForce RTX 4070"
            hint="Dedicated or integrated graphics chip"
          />
        </div>
      </div>
    );
  }

  if (category === "Monitors") {
    return (
      <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
        <h2 className="mb-4 font-semibold text-textPrimary">Specifications</h2>
        <div className="grid grid-cols-2 gap-4">
          <FieldRow
            register={register}
            name="resolution"
            label="Resolution"
            placeholder="e.g. 2560x1440"
          />
          <FieldRow
            register={register}
            name="refreshRate"
            label="Refresh Rate"
            placeholder="e.g. 165Hz"
          />
          <FieldRow
            register={register}
            name="panel"
            label="Panel Type"
            placeholder="e.g. IPS"
          />
          <FieldRow
            register={register}
            name="size"
            label="Screen Size"
            placeholder='e.g. 27"'
          />
        </div>
      </div>
    );
  }

  if (category === "Gaming") {
    return (
      <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
        <h2 className="mb-4 font-semibold text-textPrimary">Specifications</h2>
        <div className="grid grid-cols-2 gap-4">
          <FieldRow
            register={register}
            name="type"
            label="Type"
            placeholder="e.g. Mechanical Keyboard"
          />
          <FieldRow
            register={register}
            name="connectivity"
            label="Connectivity"
            placeholder="e.g. Wireless 2.4GHz / Bluetooth"
          />
          <FieldRow
            register={register}
            name="switches"
            label="Switches"
            placeholder="e.g. Cherry MX Red"
          />
          <FieldRow
            register={register}
            name="dpi"
            label="DPI"
            placeholder="e.g. 25600"
          />
        </div>
        <label className="mt-4 flex items-center gap-2 text-sm text-textSecondary">
          <input
            type="checkbox"
            {...register("rgb")}
            className="h-4 w-4 rounded border-gray-300"
          />
          RGB Lighting
        </label>
      </div>
    );
  }

  if (category === "Storage") {
    return (
      <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
        <h2 className="mb-4 font-semibold text-textPrimary">Specifications</h2>
        <div className="grid grid-cols-2 gap-4">
          <FieldRow
            register={register}
            name="capacity"
            label="Capacity"
            placeholder="e.g. 2TB"
          />
          <FieldRow
            register={register}
            name="interface"
            label="Interface"
            placeholder="e.g. PCIe 4.0 NVMe"
          />
          <FieldRow
            register={register}
            name="readSpeed"
            label="Read Speed"
            placeholder="e.g. 7000 MB/s"
          />
        </div>
      </div>
    );
  }

  return null;
};

export default SpecificationsSection;
