import React from 'react'
import Modal from 'src/shared/Modal'
type DeleteConfirmationModalProps = {
  isOpen: boolean;
  onClose: () => void;
  itemToDelete: {
    id: string;
    name: string;
    parentId?: string;
    knowledgeBaseId?: string;
  } | null;
  onConfirm: (id: string, parentId?: string, knowledgeBaseId?: string) => void;
}
const DeleteConfirmationModal = ({
  onClose,
  isOpen,
  onConfirm,
  itemToDelete,
}:
  DeleteConfirmationModalProps
) => {
  const handleConfirm = () => {
    if (itemToDelete) {
      onConfirm(itemToDelete.id, itemToDelete.parentId, itemToDelete.knowledgeBaseId);
      onClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Delete Confirmation"
      handleConfirm={handleConfirm}
    >
      <div>
        Are you sure you want to delete <span className="font-bold">{itemToDelete?.name}</span>?
      </div>
    </Modal>
  )
}

export default DeleteConfirmationModal