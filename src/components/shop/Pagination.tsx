import { useShopFilter } from "../../context/shop/ShopFilterContext";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

const Pagination = ({ currentPage, totalPages }: PaginationProps) => {
  const { setPage } = useShopFilter();

  if (totalPages <= 1) return null;

  return (
    <div className="mt-10 flex justify-center gap-2">
      {Array.from({ length: totalPages }, (_, index) => {
        const page = index + 1;

        return (
          <button
            key={page}
            onClick={() => setPage(page)}
            className={`
              h-10
              w-10
              rounded-xl
              border
              transition
              ${
                currentPage === page
                  ? "border-primary bg-primary text-white"
                  : "border-gray-300 bg-white hover:border-primary hover:text-primary"
              }
            `}
          >
            {page}
          </button>
        );
      })}
    </div>
  );
};

export default Pagination;
