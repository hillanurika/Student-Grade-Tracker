'use client';

interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: string;
  cancelText?: string;
}

export default function ConfirmDialog({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
  confirmText = 'Delete',
  cancelText = 'Cancel',
}: ConfirmDialogProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 mx-4 max-w-md w-full">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{title}</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-6">{message}</p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
