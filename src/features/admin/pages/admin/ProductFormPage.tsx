import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import {
  productSchema,
  type ProductFormInput,
  type ProductFormValues,
} from "../../validation/productSchema";
import { createProduct, updateProduct } from "../../services/adminProductService";
import { getProductById } from "../../../../services/productService";
import { getCategories } from "../../../../services/categoryService";
import type { Category } from "../../../../types/Category";
import ProductInfoSection from "../../components/products/ProductInfoSection";
import PricingInventorySection from "../../components/products/PricingInventorySection";
import SpecificationsSection from "../../components/products/SpecificationsSection";
import ProductImagesSection from "../../components/products/ProductImagesSection";
import Loading from "../../../../components/ui/Loading";

const ProductFormPage = () => {
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const navigate = useNavigate();

  const [categories, setCategories] = useState<Category[]>([]);
  const [initialImages, setInitialImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(isEditMode);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormInput, unknown, ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      title: "",
      brand: "",
      category: "",
      description: "",
      price: 0,
      stock: 0,
      image: "",
      images: [],
    },
  });

  const selectedCategory = watch("category");

  useEffect(() => {
    getCategories().then(setCategories).catch(console.error);
  }, []);

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        const product = await getProductById(id);
        reset({
          title: product.title,
          brand: product.brand,
          category: product.category,
          description: product.description ?? "",
          price: product.price,
          stock: product.stock,
          image: product.image,
          images: product.images ?? [],
          cpu: product.cpu,
          ram: product.ram,
          storage: product.storage,
          gpu: product.gpu,
          resolution: product.resolution,
          refreshRate: product.refreshRate,
          panel: product.panel,
          size: product.size,
          type: product.type,
          connectivity: product.connectivity,
          switches: product.switches,
          dpi: product.dpi,
          rgb: product.rgb,
          capacity: product.capacity,
          interface: product.interface,
          readSpeed: product.readSpeed,
        });
        setInitialImages(product.images ?? []);
      } catch {
        toast.error("Failed to load product");
        navigate("/admin/products");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, reset, navigate]);

  const onSubmit = async (data: ProductFormValues) => {
    try {
      if (isEditMode && id) {
        await updateProduct(id, data);
        toast.success("Product updated");
      } else {
        await createProduct(data);
        toast.success("Product created");
      }
      navigate("/admin/products");
    } catch {
      toast.error(isEditMode ? "Failed to update product" : "Failed to create product");
    }
  };

  if (loading) return <Loading />;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 pb-24">
      <div>
        <h1 className="text-2xl font-semibold text-textPrimary">
          {isEditMode ? "Edit Product" : "Add Product"}
        </h1>
        <p className="mt-1 text-sm text-textSecondary">
          {isEditMode
            ? "Update this product's details."
            : "Add a new product to your store."}
        </p>
      </div>

      <ProductInfoSection register={register} errors={errors} categories={categories} />
      <PricingInventorySection register={register} errors={errors} />
      <SpecificationsSection register={register} category={selectedCategory} />
      <ProductImagesSection setValue={setValue} initialImages={initialImages} />

      <div className="fixed inset-x-0 bottom-0 flex items-center justify-between border-t border-border bg-white px-6 py-4 lg:pl-[260px]">
        <p className="text-sm text-textSecondary">
          Changes will be published immediately upon saving.
        </p>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => navigate("/admin/products")}
            className="rounded-xl px-5 py-2.5 font-medium text-textSecondary hover:bg-background"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-xl bg-primary px-5 py-2.5 font-medium text-white hover:bg-primaryHover disabled:opacity-60"
          >
            {isSubmitting ? "Saving..." : "Save Product"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default ProductFormPage;