interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
  }
  
  const Modal = ({ isOpen, onClose, onConfirm }: ModalProps) => {
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
        <div className="bg-white p-6 rounded-lg w-96">
          <h2 className="text-xl font-semibold text-center">¿Are you sure?</h2>
          <p className="mt-4 text-center">This action can't turn back.</p>
          <div className="mt-6 flex justify-around">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
            >
              Cancelar
            </button>
            <button
              onClick={onConfirm}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              Eliminar
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default Modal;