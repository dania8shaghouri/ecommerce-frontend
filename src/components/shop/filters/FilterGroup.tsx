import FilterCheckbox from "./FilterCheckbox";

import type { FilterOption } from "../../../types/Filter";

interface Props {
  title: string;

  options: FilterOption[];

  selected: string[];

  onToggle: (value: string) => void;
}

const FilterGroup = ({ title, options, selected, onToggle }: Props) => {
  return (
    <div className="mb-8">
      <h3 className="mb-4 font-semibold">{title}</h3>

      <div className="space-y-3">
        {options.map((option) => (
          <FilterCheckbox
            key={option.value}
            label={option.label}
            checked={selected.includes(option.value)}
            onChange={() => onToggle(option.value)}
            count={option.count}
          />
        ))}
      </div>
    </div>
  );
};

export default FilterGroup;
