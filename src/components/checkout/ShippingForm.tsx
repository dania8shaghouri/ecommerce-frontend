import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  checkoutSchema,
  type CheckoutFormData,
} from "../../validation/checkoutSchema";
import Input from "../ui/Input";
import Textarea from "../ui/Textarea";

interface Props {
  onSubmit: (data: CheckoutFormData) => void;
}

const ShippingForm = ({ onSubmit }: Props) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* SHIPPING */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="mb-4 font-semibold text-lg">Shipping Information</h2>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <Input placeholder="Full Name" {...register("fullName")} />
            <p className="error">{errors.fullName?.message}</p>
          </div>

          <div>
            <Input
              placeholder="Phone"
              {...register("phone")}
              onChange={(e) =>
                setValue("phone", e.target.value.replace(/\D/g, ""))
              }
            />
            <p className="error">{errors.phone?.message}</p>
          </div>

          <div className="md:col-span-2">
            <Input placeholder="City" {...register("city")} />
            <p className="error">{errors.city?.message}</p>
          </div>

          <div className="md:col-span-2">
            <Textarea placeholder="Address" {...register("address")} />
            <p className="error">{errors.address?.message}</p>
          </div>
        </div>
      </div>

      {/* SUBMIT */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <button
          type="submit"
          className="w-full mt-6 bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primaryHover"
        >
          Continue to Payment
        </button>
      </div>
    </form>
  );
};

export default ShippingForm;
