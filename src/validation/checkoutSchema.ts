import { z } from "zod";

export const checkoutSchema = z.object({
  fullName: z.string().min(3, "Full name is required"),
  phone: z
    .string()
    .min(10, "Phone must be at least 10 digits")
    .regex(/^\d+$/, "Only numbers allowed"),

  city: z.string().min(2, "City is required"),
  address: z.string().min(5, "Address is required"),
});

export type CheckoutFormData = z.infer<typeof checkoutSchema>;
