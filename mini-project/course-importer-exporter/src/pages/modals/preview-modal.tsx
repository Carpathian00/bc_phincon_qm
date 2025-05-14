/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/PreviewModal.tsx
import { Dialog } from "@headlessui/react";
import { Fragment } from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  data: any[];
  headers: string[];
  isLoading: boolean;
};

const displayNameMap: Record<string, string> = {
  id: "ID",
  fullname: "Fullname",
  username: "Username",
  email: "Email",
  phoneNumber: "Phone Number",
  password: "Password",
  role: "Role",
  active: "Active",
  data: "Data",
  createdAt: "Created At",
  updatedAt: "Updated At",
};

export default function PreviewModal({
  isOpen,
  onClose,
  onConfirm,
  data,
  headers,
  isLoading,
}: Props) {
  return (
    <Dialog open={isOpen} onClose={onClose} as={Fragment}>
      <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
        <Dialog.Panel className="bg-white w-full max-w-5xl rounded-lg p-6 shadow-lg">
          <Dialog.Title className="text-xl font-semibold mb-4">
            Preview Imported Data
          </Dialog.Title>

          <div className="overflow-auto max-h-[60vh] border rounded mb-6">
            <table className="min-w-full text-sm border border-gray-300">
              <thead className="bg-gray-100 text-xs">
                <tr>
                  {headers.map((head, i) => (
                    <th key={i} className="border px-3 py-2 text-left">
                      {displayNameMap[head] ?? [head]}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.map((row, i) => (
                  <tr key={i} className="even:bg-gray-50">
                    {headers.map((key) => (
                      <td key={key} className="border px-3 py-1.5">
                        {String(row[key])}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 text-sm"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              disabled={isLoading}
              className={`px-4 py-2 rounded bg-green-600 hover:bg-green-700 text-white text-sm ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isLoading ? "Importing..." : "Import"}
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}

