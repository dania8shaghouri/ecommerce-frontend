import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import type { Product } from "../types/Product";
import { BASE_URL } from "../constants/baseUrl";
import { getImageUrl } from "../utils/getImageUrl";
import { useAddToCart } from "../hooks/useAddToCart";

const FALLBACK_IMAGE =
  "https://shop.asus.com/media/catalog/product/4/0/40521b738bb3e28bbb9ba94bdcf7e493_5.png";

const formatPrice = (price: number) =>
  new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "TRY",
  }).format(price);

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [mainImage, setMainImage] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { addToCart } = useAddToCart();

  
  const handleAddToCart = () => {
    if (!product) return;
    addToCart(product);
  };

  useEffect(() => {
    const getProduct = async () => {
      try {
        setLoading(true);
        setError(null);

        const { data } = await axios.get(`${BASE_URL}/product/${id}`);
        setProduct(data);
        setMainImage(data.images?.[0] || data.image);
      } catch (err) {
        console.error(err);
        setError("Failed to load product");
      } finally {
        setLoading(false);
      }
    };

    getProduct();
  }, [id]);

  if (loading) {
    return <div className="p-10 text-center">Loading...</div>;
  }

  if (error || !product) {
    return <div className="p-10 text-center text-red-500">{error}</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6 grid md:grid-cols-2 gap-10">
      {/* image */}
      <div className="bg-white p-6 rounded-xl shadow">
        <img
          src={getImageUrl(mainImage)}
          alt={product.title}
          className="w-full object-contain"
          onError={(e) => {
            e.currentTarget.src = FALLBACK_IMAGE;
          }}
        />

        {/* thumbnails */}
        {product.images && product.images.length > 1 && (
          <div className="flex gap-2 mt-4">
            {product.images.map((img, idx) => (
              <img
                key={idx}
                src={getImageUrl(img)}
                alt={`${product.title} ${idx}`}
                className="w-20 h-20 object-contain cursor-pointer border rounded"
                onClick={() => setMainImage(img)}
              />
            ))}
          </div>
        )}
      </div>

      {/* details */}
      <div>
        <h1 className="text-2xl font-bold mb-2">{product.title}</h1>
        <p className="text-gray-500 mb-4">{product.brand}</p>

        <div className="space-y-2 text-gray-700">
          <p>
            <strong>CPU:</strong> {product.cpu}
          </p>
          <p>
            <strong>RAM:</strong> {product.ram}
          </p>
          <p>
            <strong>Storage:</strong> {product.storage}
          </p>
          <p>
            <strong>GPU:</strong> {product.gpu}
          </p>
        </div>

        <div className="mt-6 text-2xl font-bold text-primary">
          {formatPrice(product.price)}
        </div>

        <button
          className="mt-6 w-full bg-primary text-white py-3 rounded-xl"
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetailPage;
