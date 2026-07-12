import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [value, setValue] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    const search = value.trim();

    if (!search) return;

    navigate(`/shop?search=${encodeURIComponent(search)}`);
  };

  return (
    <div className="flex items-center w-full bg-background rounded-xl px-3 py-2 gap-2">
      <button onClick={handleSearch}>
        <FiSearch className="text-textSecondary text-lg" />
      </button>

      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSearch();
          }
        }}
        placeholder="Search..."
        className="bg-transparent outline-none w-full text-sm text-textPrimary"
      />
    </div>
  );
};

export default SearchBar;