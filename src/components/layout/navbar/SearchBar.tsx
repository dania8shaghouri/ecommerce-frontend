import { useState } from "react";
import { FiSearch } from "react-icons/fi";

const SearchBar = () => {
  const [value, setValue] = useState("");

  return (
    <div className="flex items-center w-full bg-background rounded-xl px-3 py-2 gap-2">
      <FiSearch className="text-textSecondary text-lg" />

      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search..."
        className="bg-transparent outline-none w-full text-sm text-textPrimary"
      />
    </div>
  );
};

export default SearchBar;
