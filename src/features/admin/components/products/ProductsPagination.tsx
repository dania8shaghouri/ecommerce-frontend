interface Props {
  currentPage: number;
  totalPages: number;
  totalProducts: number;
  limit: number;
  onPageChange: (page: number) => void;
}

const ProductsPagination = ({
  currentPage,
  totalPages,
  totalProducts,
  limit,
  onPageChange,
}: Props) => {
  if (totalPages <= 1) return null;

  const start = (currentPage - 1) * limit + 1;
  const end = Math.min(currentPage * limit, totalProducts);

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-between border-t border-border px-6 py-4">
      <p className="text-sm text-textSecondary">
        Showing {start}-{end} of {totalProducts} products
      </p>

      <div className="flex items-center gap-1">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="rounded-lg px-3 py-1.5 text-sm text-textSecondary hover:bg-background disabled:cursor-not-allowed disabled:opacity-40"
        >
          Previous
        </button>

        {pageNumbers.map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => onPageChange(pageNumber)}
            className={`h-8 w-8 rounded-lg text-sm font-medium ${
              pageNumber === currentPage
                ? "bg-primary text-white"
                : "text-textSecondary hover:bg-background"
            }`}
          >
            {pageNumber}
          </button>
        ))}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="rounded-lg px-3 py-1.5 text-sm text-textSecondary hover:bg-background disabled:cursor-not-allowed disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductsPagination;