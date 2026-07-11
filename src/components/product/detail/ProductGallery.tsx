import { useState } from "react";

import type { Product } from "../../../types/Product";
import { getImageUrl } from "../../../utils/getImageUrl";

interface ProductGalleryProps {
  product: Product;
}

const ProductGallery = ({ product }: ProductGalleryProps) => {
  const images = product.images.length > 0 ? product.images : [product.image];

  const [mainImage, setMainImage] = useState(images[0]);
  const [zoom, setZoom] = useState(false);
  const [position, setPosition] = useState({
    x: 50,
    y: 50,
  });

  const canHover = window.matchMedia(
    "(hover: hover) and (pointer: fine)",
  ).matches;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();

    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;

    setPosition({ x, y });
  };

  return (
    <div className="flex items-start gap-6">
      {/* Thumbnails */}
      <div className="flex flex-col gap-4 ">
        {images.map((image) => (
          <button
            key={image}
            type="button"
            onClick={() => setMainImage(image)}
            onMouseEnter={() => setMainImage(image)}
            className={`
              h-24
              w-24
              overflow-hidden
              rounded-2xl
              border-2
              bg-white
              transition-all
              duration-300

              ${
                image === mainImage
                  ? "border-primary shadow-lg"
                  : "border-gray-200 hover:border-primary hover:shadow-md"
              }
            `}
          >
            <img
              src={getImageUrl(image)}
              alt={product.title}
              className="h-full w-full object-contain p-2 "
            />
          </button>
        ))}
      </div>

      {/* Main Image */}
      <div
        onMouseMove={(e) => {
          if (canHover) {
            handleMouseMove(e);
          }
        }}
        onMouseEnter={() => {
          if (canHover) {
            setZoom(true);
          }
        }}
        onMouseLeave={() => {
          if (canHover) {
            setZoom(false);
          }
        }}
        className="
    w-full
    max-w-[650px]
    overflow-hidden
    rounded-3xl
    border
    border-gray-200
    bg-gradient-to-b
    from-slate-50
    to-white
    p-3
    shadow-sm
    cursor-zoom-out
  "
      >
        <img
          src={getImageUrl(mainImage)}
          alt={product.title}
          className="
    aspect-square
    w-full
    rounded-lg
    object-contain
    transition-transform
    duration-200
  "
          style={{
            transform: zoom && canHover ? "scale(2)" : "scale(1)",
            transformOrigin: `${position.x}% ${position.y}%`,
          }}
        />
      </div>
    </div>
  );
};

export default ProductGallery;
