import { z } from "zod";

export const productSchema = z.object({
  title: z.string().min(2, "Title is required"),
  brand: z.string().min(1, "Brand is required"),
  category: z.string().min(1, "Category is required"),
  description: z.string().optional(),

  price: z.coerce.number().positive("Price must be greater than 0"),
  stock: z.coerce.number().min(0, "Stock cannot be negative"),

  // Laptop
  cpu: z.string().optional(),
  ram: z.string().optional(),
  storage: z.string().optional(),
  gpu: z.string().optional(),

  // Monitor
  resolution: z.string().optional(),
  refreshRate: z.string().optional(),
  panel: z.string().optional(),
  size: z.string().optional(),

  // Gaming
  type: z.string().optional(),
  connectivity: z.string().optional(),
  switches: z.string().optional(),
  dpi: z.string().optional(),
  rgb: z.boolean().optional(),

  // Storage
  capacity: z.string().optional(),
  interface: z.string().optional(),
  readSpeed: z.string().optional(),

  image: z.string().min(1, "At least one image is required"),
  images: z.array(z.string()).optional(),
});

export type ProductFormInput = z.input<typeof productSchema>;
export type ProductFormValues = z.output<typeof productSchema>;