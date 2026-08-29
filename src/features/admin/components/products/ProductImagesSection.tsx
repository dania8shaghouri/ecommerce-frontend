import { useEffect, useRef, useState } from "react";
import { FiUploadCloud, FiX } from "react-icons/fi";
import toast from "react-hot-toast";
import type { UseFormSetValue } from "react-hook-form";
import { uploadProductImages } from "../../services/adminProductService";
import { getImageUrl } from "../../../../utils/getImageUrl";
import type { ProductFormInput } from "../../validation/productSchema";

interface Props {
  setValue: UseFormSetValue<ProductFormInput>;
  initialImages?: string[];
}

const ProductImagesSection = ({ setValue, initialImages = [] }: Props) => {
  const [images, setImages] = useState<string[]>(initialImages);
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setValue("images", images);
    setValue("image", images[0] ?? "");
  }, [images, setValue]);

  const handleFiles = async (fileList: FileList | null) => {
    if (!fileList || fileList.length === 0) return;

    setIsUploading(true);
    try {
      const response = await uploadProductImages(Array.from(fileList));
      setImages((prev) => [...prev, ...response.data.filenames]);
    } catch {
      toast.error("Failed to upload images");
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemove = (filename: string) => {
    setImages((prev) => prev.filter((img) => img !== filename));
  };

  return (
    <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
      <h2 className="mb-4 font-semibold text-textPrimary">Product Images</h2>

      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);
          handleFiles(e.dataTransfer.files);
        }}
        onClick={() => fileInputRef.current?.click()}
        className={`flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed py-10 text-center transition ${
          isDragging ? "border-primary bg-blue-50" : "border-primary/40 bg-blue-50/30"
        }`}
      >
        <FiUploadCloud className="mb-2 text-2xl text-primary" />
        <p className="text-sm text-textPrimary">
          {isUploading ? "Uploading..." : "Drag and drop images here or click to browse"}
        </p>
        <p className="mt-1 text-xs text-textSecondary">PNG, JPG up to 5MB</p>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/png,image/jpeg,image/webp"
          multiple
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
      </div>

      {images.length > 0 && (
        <div className="mt-4">
          <p className="mb-2 text-sm text-textSecondary">
            Uploaded Images ({images.length})
          </p>
          <div className="flex flex-wrap gap-3">
            {images.map((filename) => (
              <div key={filename} className="relative h-16 w-16">
                <img
                  src={getImageUrl(filename)}
                  alt=""
                  className="h-full w-full rounded-lg border border-border object-cover"
                />
                <button
                  type="button"
                  onClick={() => handleRemove(filename)}
                  className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-textPrimary text-white"
                >
                  <FiX size={12} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductImagesSection;