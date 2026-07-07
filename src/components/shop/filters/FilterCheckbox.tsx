interface Props {
  label: string;
  checked: boolean;
  onChange: () => void;
  count?: number;
}

const FilterCheckbox = ({ label, checked, onChange, count }: Props) => {
  return (
    <label className="flex cursor-pointer items-center justify-between">
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="
            h-4
            w-4
            rounded
            border-gray-300
            text-primary
            focus:ring-primary
          "
        />

        <span className="text-sm text-gray-700">{label}</span>
      </div>

      {count !== undefined && (
        <span className="text-sm text-gray-400">{count}</span>
      )}
    </label>
  );
};

export default FilterCheckbox;
