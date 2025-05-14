import React from "react";
import { Dialog } from "@headlessui/react";

interface Properties {
  errors: string[];
  onClose: () => void;
}

const ImportErrorModal: React.FC<Properties> = ({ errors, onClose }) => {
  return (
    <Dialog
      open={true}
      onClose={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center"
    >
      <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
        <Dialog.Panel className="bg-white rounded-lg p-6 w-full max-w-xl shadow-xl z-10">
          <Dialog.Title className="text-lg font-semibold mb-4 text-red-600">
            Import Failed
          </Dialog.Title>
          <Dialog.Description className="mb-3 text-sm text-gray-700">
            The import was cancelled. The following issues were found:
          </Dialog.Description>
          <div className="max-h-64 overflow-y-auto border rounded bg-gray-50 text-sm p-3 space-y-1">
            {errors.map((error, i) => (
              <div key={i} className="text-red-500">
                • {error}
              </div>
            ))}
          </div>
          <div className="flex justify-end mt-5">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-800"
            >
              Close
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default ImportErrorModal;
