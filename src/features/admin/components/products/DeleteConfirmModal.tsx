import Modal from "../../../../components/ui/Modal";
import type { AdminProduct } from "../../types/adminProduct";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  product: AdminProduct | null;
  isDeleting: boolean;
}

const DeleteConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  product,
  isDeleting,
}: Props) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Delete Product">
      <p className="text-textSecondary">
        Are you sure you want to delete{" "}
        <span className="font-medium text-textPrimary">{product?.title}</span>?
        This action cannot be undone.
      </p>

      <div className="mt-6 flex justify-end gap-3">
        <button
          onClick={onClose}
          className="rounded-xl px-5 py-2.5 font-medium text-textSecondary hover:bg-background"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          disabled={isDeleting}
          className="rounded-xl bg-danger px-5 py-2.5 font-medium text-white hover:opacity-90 disabled:opacity-60"
        >
          {isDeleting ? "Deleting..." : "Delete"}
        </button>
      </div>
    </Modal>
  );
};

export default DeleteConfirmModal;