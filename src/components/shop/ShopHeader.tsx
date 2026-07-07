import SortSelect from "./SortSelect";

interface Props {
  total: number;
}

const ShopHeader = ({ total }: Props) => {
  return (
    <div className="mb-8 flex items-center justify-between">
      <p className="text-sm text-textSecondary">
        Showing <strong>{total}</strong> products
      </p>

      <SortSelect />
    </div>
  );
};

export default ShopHeader;
