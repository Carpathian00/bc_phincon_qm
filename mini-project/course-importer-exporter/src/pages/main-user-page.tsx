/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState, useRef } from "react";
import { useUIStore } from "../stores/ui-store.ts";
import axios from "axios";
import * as XLSX from "xlsx";
import PreviewModal from "./modals/preview-modal.tsx";
import type { User } from "../types/user-type.ts";
import type { UploadRowUser } from "../types/upload-row-type.ts";
import ImportErrorModal from "./modals/import-error-modal.tsx";

function MainUserPage() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [importLoading, setImportLoading] = useState(false);
  const [previewData, setPreviewData] = useState<any[]>([]);
  const [headers, setHeaders] = useState<string[]>([]);
  const [importErrors, setImportErrors] = useState<string[]>([]);
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const page = useUIStore((state) => state.page);
  const setPage = useUIStore((state) => state.setPage);
  const modalOpen = useUIStore((state) => state.modalIsOpen);
  const openModal = useUIStore((state) => state.openModal);
  const closeModal = useUIStore((state) => state.closeModal);
  const [totalPages, setTotalPages] = useState(1);

  const handleImportClick = () => fileInputRef.current?.click();

  const fetchUsers = async (page: number) => {
    try {
      const res = await axios.get("http://localhost:3001/api/users", {
        params: { page, limit: 10 },
      });
      setUsers(res.data.data);
      setTotalPages(res.data.pagination.totalPages);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch users:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(page);
  }, [page]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (evt) => {
      const data = new Uint8Array(evt.target?.result as ArrayBuffer);
      const workbook = XLSX.read(data, { type: "array" });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];

      const rawHeaderRow = XLSX.utils.sheet_to_json(worksheet, { header: 1 })[0] as string[];
      const totalColumns = rawHeaderRow.findLastIndex(h => h && !h.startsWith("_EMPTY")) + 1;
      const range = XLSX.utils.decode_range(worksheet["!ref"]!);
      range.e.c = totalColumns - 1;
      worksheet["!ref"] = XLSX.utils.encode_range(range);

      const rawJson = XLSX.utils.sheet_to_json(worksheet, { defval: "" });

      if (rawJson.length === 0) {
        alert("No data found in the file.");
        return;
      }

      const headerMap: Record<string, keyof UploadRowUser> = {
        ID: "id",
        Fullname: "fullname",
        Username: "username",
        Email: "email",
        "Phone Number": "phoneNumber",
        Role: "role",
        Active: "active",
        Data: "data",
      };

      const fileHeader = Object.keys(rawJson[0] as object);
      const expectedHeadersWithId = Object.keys(headerMap);
      const expectedHeadersWithoutId = expectedHeadersWithId.slice(1);

      const validWithId =
        fileHeader.length === expectedHeadersWithId.length &&
        fileHeader.every((h, i) => h === expectedHeadersWithId[i]);

      const validWithoutId =
        fileHeader.length === expectedHeadersWithoutId.length &&
        fileHeader.every((h, i) => h === expectedHeadersWithoutId[i]);

      if (!validWithId && !validWithoutId) {
        alert(
          "Invalid file format. Headers must match:\n\n" +
            expectedHeadersWithId.join(", ") +
            "\n\nor\n\n" +
            expectedHeadersWithoutId.join(", ") +
            "\n\nReceived:\n" +
            fileHeader.join(", ")
        );
        return;
      }

      const mappedJson: UploadRowUser[] = rawJson.map((row: any) => {
        const mappedRow: Partial<UploadRowUser> = {};
        Object.entries(headerMap).forEach(([friendly, key]) => {
          if (row[friendly] !== undefined) {
            mappedRow[key] = row[friendly];
          }
        });
        return mappedRow as UploadRowUser;
      });

      const requiredFields: (keyof UploadRowUser)[] = [
        "fullname",
        "username",
        "email",
        "phoneNumber",
        "role",
        "active",
        "data",
      ];
      const json = mappedJson.filter((row) =>
        requiredFields.every((field) => row[field] !== undefined && row[field] !== "")
      );

      const skipped = mappedJson.length - json.length;
      if (skipped > 0) {
        alert(`${skipped} incomplete row(s) were skipped during validation.`);
      }

      const keyFields: (keyof UploadRowUser)[] = [
        "fullname",
        "username",
        "email",
        "phoneNumber",
      ];
      const duplicates: string[] = [];

      keyFields.forEach((field) => {
        const seen = new Set();
        json.forEach((row, index) => {
          const value = row[field];
          if (seen.has(value)) {
            duplicates.push(`Duplicate value "${value}" found in field "${field}" at row ${index + 2}`);
          }
          seen.add(value);
        });
      });

      if (duplicates.length > 0) {
        alert("Duplicate values found:\n" + duplicates.join("\n") + "\n\nPlease check the file and try again.");
        return;
      }

      setPreviewData(json);
      setHeaders(Object.keys(json[0] || {}));
      openModal();
    };

    reader.readAsArrayBuffer(file);
    e.target.value = "";
  };

  const handleFileDownload = async () => {
    const file = await axios.get("http://localhost:3001/api/users/download", { responseType: "blob" });
    const url = URL.createObjectURL(file.data);
    const link = document.createElement("a");
    link.href = url;
    link.download = "users.xlsx";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const confirmImport = async () => {
    try {
      setImportLoading(true);
      await axios.post("http://localhost:3001/api/users/mass-create", { data: previewData });
      setImportLoading(false);
      closeModal();
      fetchUsers(page);
    } catch (error: any) {
      setImportLoading(false);
      closeModal();

      const errors = error.response?.data?.errors;
      if (errors?.length > 0) {
        setImportErrors(errors);
        setErrorModalOpen(true);
      } else {
        alert("Unexpected error: " + (error.response?.data?.message || error.message));
      }
    }
  };

  return (
    <div className="p-6 max-w-full">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
        <h1 className="text-4xl font-bold text-gray-800">User Management</h1>
        <div className="flex gap-2">
          <button onClick={handleFileDownload} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 shadow-sm transition">⬇️ Download</button>
          <button onClick={handleImportClick} className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 shadow-sm transition">⬆️ Import</button>
          <input type="file" accept=".xlsx,.xls" ref={fileInputRef} onChange={handleFileChange} className="hidden" />
        </div>
      </div>

      {loading ? (
        <div className="text-center text-gray-500">Loading users...</div>
      ) : (
        <div className="bg-gray-50 shadow-md rounded-lg p-4">
          <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
            <table className="w-full text-sm text-left border-none">
              <thead className="bg-blue-100 text-gray-700 uppercase text-xs">
                <tr>
                  <th className="px-4 py-3">ID</th>
                  <th className="px-4 py-3">Full Name</th>
                  <th className="px-4 py-3">Username</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Phone</th>
                  <th className="px-4 py-3">Password</th>
                  <th className="px-4 py-3">Role</th>
                  <th className="px-4 py-3">Active</th>
                  <th className="px-4 py-3">Data</th>
                  <th className="px-4 py-3">Created</th>
                  <th className="px-4 py-3">Updated</th>
                </tr>
              </thead>
              <tbody>
                {users.length > 0 ? (
                  users.map((user, index) => (
                    <tr key={user.id} className={index === users.length - 1 ? "" : "border-b border-gray-500"}>
                      <td className="px-4 py-2">{user.id}</td>
                      <td className="px-4 py-2">{user.fullname}</td>
                      <td className="px-4 py-2">{user.username}</td>
                      <td className="px-4 py-2">{user.email}</td>
                      <td className="px-4 py-2">{user.phoneNumber}</td>
                      <td className="px-4 py-2">{user.password}</td>
                      <td className="px-4 py-2 capitalize">{user.role}</td>
                      <td className="px-4 py-2">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${user.active ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                          {user.active == 1 ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td className="px-4 py-2 text-xs">{JSON.stringify(user.data)}</td>
                      <td className="px-4 py-2 text-gray-500 text-xs">{new Date(user.createdAt).toLocaleDateString()}</td>
                      <td className="px-4 py-2 text-gray-500 text-xs">{new Date(user.updatedAt).toLocaleDateString()}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={11} className="text-center py-6 text-gray-500">No users found.</td>
                  </tr>
                )}
              </tbody>
            </table>
            <PreviewModal isOpen={modalOpen} onClose={closeModal} onConfirm={confirmImport} data={previewData} headers={headers} isLoading={importLoading} />
            {errorModalOpen && <ImportErrorModal errors={importErrors} onClose={() => setErrorModalOpen(false)} />}
          </div>
        </div>
      )}

      <div className="flex justify-center mt-4 space-x-2">
        <button onClick={() => setPage(Math.max(1, page - 1))} disabled={page === 1} className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50">Prev</button>
        <span className="px-4 py-1">{`Page ${page} of ${totalPages}`}</span>
        <button onClick={() => setPage(Math.min(totalPages, page + 1))} disabled={page === totalPages} className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50">Next</button>
      </div>
    </div>
  );
}

export default MainUserPage;
