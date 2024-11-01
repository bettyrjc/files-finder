import React from 'react';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  handleConfirm?: () => void;
  confirmButtonText?: string;
}
const Modal = ({
  isOpen,
  onClose,
  title = "Modal Title",
  children,
  handleConfirm,
  confirmButtonText = "Sí, eliminar"
}: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="relative">
      <div className="fixed inset-0 z-[9999]">
        <div
          className="fixed inset-0 bg-black/50"
          onClick={onClose}
          aria-hidden="true"
        />
        <div className="fixed inset-0 flex items-center justify-center">
          <div
            className="w-full max-w-md mx-4 overflow-hidden bg-white rounded-lg shadow-xl"
            style={{ isolation: 'isolate' }}  /* Crea un nuevo stack context */
          >
            <div className="flex items-center justify-between p-4 bg-white border-b">
              <h2 className="text-xl font-semibold text-gray-800">
                {title}
              </h2>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="relative p-4 bg-white">
              {children}
            </div>

            <div className="flex justify-end gap-2 p-4 bg-white ">
              <button
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300"
              >
                Cancelar
              </button>
              <button
                onClick={handleConfirm}
                className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                {confirmButtonText}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;