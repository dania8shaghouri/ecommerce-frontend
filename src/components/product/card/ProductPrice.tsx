interface ProductPriceProps {
  price: number;
}

const ProductPrice = ({ price }: ProductPriceProps) => {
  return (
    <div className="text-2xl font-bold text-primary">
      {new Intl.NumberFormat("tr-TR", {
        style: "currency",
        currency: "TRY",
      }).format(price)}
    </div>
  );
};

export default ProductPrice;
