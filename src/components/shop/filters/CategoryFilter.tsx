import { useCategories } from "../../../hooks/useCategories";

const CategoryFilter = () => {
  const { categories, loading } = useCategories();

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="space-y-3">
      <h3 className="font-semibold text-lg">Categories</h3>

      {categories.map((category) => (
        <label
          key={category.name}
          className="flex items-center justify-between cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <input type="checkbox" />

            <span>{category.name}</span>
          </div>

          <span className="text-sm text-gray-400">
            {category.totalProducts}
          </span>
        </label>
      ))}
    </div>
  );
};

export default CategoryFilter;
