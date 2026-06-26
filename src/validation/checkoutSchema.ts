import { z } from "zod";

export const checkoutSchema = z.object({
  fullName: z.string().min(3, "Full name is required"),
  phone: z
    .string()
    .min(10, "Phone must be at least 10 digits")
    .regex(/^\d+$/, "Only numbers allowed"),

  city: z.string().min(2, "City is required"),
  address: z.string().min(5, "Address is required"),

  cardName: z.string().min(3, "Card holder name is required"),

  cardNumber: z
    .string()
    .transform((val) => val.replace(/\s/g, "")) 
    .refine((val) => val.length === 16, "Card number must be 16 digits"),

  expiry: z
    .string()
    .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Format must be MM/YY")
    .refine((val) => {
      const [month, year] = val.split("/");
      const expDate = new Date(Number("20" + year), Number(month));

      const now = new Date();

      return expDate > now;
    }, "Card is expired"),

  cvv: z.string().min(3, "CVV must be 3 digits").max(3, "CVV must be 3 digits"),
});

export type CheckoutFormData = z.infer<typeof checkoutSchema>;
