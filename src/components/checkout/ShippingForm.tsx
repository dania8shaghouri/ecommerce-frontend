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

  const formatCardNumber = (value: string) =>
    value
      .replace(/\D/g, "")
      .slice(0, 16)
      .replace(/(\d{4})/g, "$1 ")
      .trim();

  const formatExpiry = (value: string) => {
    const cleaned = value.replace(/\D/g, "").slice(0, 4);
    if (cleaned.length >= 3) {
      return `${cleaned.slice(0, 2)}/${cleaned.slice(2)}`;
    }
    return cleaned;
  };

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

      {/* PAYMENT */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="mb-4 font-semibold text-lg">Payment Information</h2>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="md:col-span-2">
            <Input placeholder="Card Holder Name" {...register("cardName")} />
            <p className="error">{errors.cardName?.message}</p>
          </div>

          <div className="md:col-span-2">
            <Input
              placeholder="Card Number"
              {...register("cardNumber")}
              onChange={(e) =>
                setValue("cardNumber", formatCardNumber(e.target.value))
              }
            />
            <p className="error">{errors.cardNumber?.message}</p>
          </div>

          <div>
            <Input
              placeholder="MM/YY"
              {...register("expiry")}
              onChange={(e) => setValue("expiry", formatExpiry(e.target.value))}
            />
            <p className="error">{errors.expiry?.message}</p>
          </div>

          <div>
            <Input
              placeholder="CVV"
              {...register("cvv")}
              onChange={(e) =>
                setValue("cvv", e.target.value.replace(/\D/g, "").slice(0, 3))
              }
            />
            <p className="error">{errors.cvv?.message}</p>
          </div>
        </div>

        <button
          type="submit"
          className="w-full mt-6 bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primaryHover"
        >
          Pay Now
        </button>
      </div>
    </form>
  );
};

export default ShippingForm;
