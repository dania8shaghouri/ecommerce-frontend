import { useEffect, useRef, useState } from "react";
import { FiMoreVertical, FiEdit2, FiTrash2 } from "react-icons/fi";
import type { AdminProduct } from "../../types/adminProduct";

interface Props {
  product: AdminProduct;
  onEdit: (product: AdminProduct) => void;
  onDelete: (product: AdminProduct) => void;
}

const ProductActionsMenu = ({ product, onEdit, onDelete }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={menuRef}>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="rounded-lg p-2 text-textSecondary hover:bg-background"
      >
        <FiMoreVertical size={18} />
      </button>

      {isOpen && (
        <div className="absolute right-0 z-10 mt-1 w-36 animate-fadeIn rounded-xl border border-border bg-white py-1 shadow-dropdown">
          <button
            onClick={() => {
              setIsOpen(false);
              onEdit(product);
            }}
            className="flex w-full items-center gap-2 px-4 py-2 text-sm text-textPrimary hover:bg-background"
          >
            <FiEdit2 size={14} /> Edit
          </button>

          <button
            onClick={() => {
              setIsOpen(false);
              onDelete(product);
            }}
            className="flex w-full items-center gap-2 px-4 py-2 text-sm text-danger hover:bg-red-50"
          >
            <FiTrash2 size={14} /> Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductActionsMenu;