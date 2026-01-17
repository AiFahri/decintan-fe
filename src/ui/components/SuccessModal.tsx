import { Check } from "lucide-react";

interface SuccessModalProps {
  isOpen: boolean;
  title?: string;
  message: string;
  onClose: () => void;
  autoCloseDuration?: number; // in milliseconds
}

export const SuccessModal: React.FC<SuccessModalProps> = ({
  isOpen,
  title = "Berhasil",
  message,
  onClose,
  autoCloseDuration,
}) => {
  // Auto close after duration
  if (isOpen && autoCloseDuration) {
    setTimeout(onClose, autoCloseDuration);
  }

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <div
          className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="mx-auto w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6">
            <Check className="w-16 h-16 text-green-600 stroke-3" />
          </div>

          {title && (
            <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
          )}

          <p className="text-green-600 font-semibold text-lg mb-6">{message}</p>

          {!autoCloseDuration && (
            <button
              onClick={onClose}
              className="px-6 py-2 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors font-medium"
            >
              Tutup
            </button>
          )}
        </div>
      </div>
    </>
  );
};
