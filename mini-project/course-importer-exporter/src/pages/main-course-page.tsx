/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import * as XLSX from "xlsx";
import PreviewModal from "./modals/preview-modal.tsx";
import type { UploadRowCourse } from "../types/upload-row-type.ts";
import ImportErrorModal from "./modals/import-error-modal.tsx";
import type { Course } from "../types/courses-type.ts";

function MainCoursePage() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [importLoading, setImportLoading] = useState(false);
  const [previewData, setPreviewData] = useState<any[]>([]);
  const [headers, setHeaders] = useState<string[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [importErrors, setImportErrors] = useState<string[]>([]);
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchCourses = async (page: number) => {
    try {
      const res = await axios.get("http://localhost:3001/api/courses", {
        params: { page, limit: 10 },
      });
      setCourses(res.data.data);
      setTotalPages(res.data.pagination.totalPages);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch courses:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses(page);
  }, [page]);

  const handleImportClick = () => {
    fileInputRef.current?.click(); // Trigger hidden input
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (evt) => {
      const data = new Uint8Array(evt.target?.result as ArrayBuffer);
      const workbook = XLSX.read(data, { type: "array" });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];

      // Trim unused columns
      const rawHeaderRow = XLSX.utils.sheet_to_json(worksheet, {
        header: 1,
      })[0] as string[];
      const totalColumns =
        rawHeaderRow.findLastIndex((h) => h && !h.startsWith("_EMPTY")) + 1;
      const range = XLSX.utils.decode_range(worksheet["!ref"]!);
      range.e.c = totalColumns - 1;
      worksheet["!ref"] = XLSX.utils.encode_range(range);

      // Convert to raw row objects using friendly headers
      const rawJson = XLSX.utils.sheet_to_json(worksheet, { defval: "" });

      if (rawJson.length === 0) {
        alert("No data found in the file.");
        return;
      }

      // Map of user-facing headers to internal keys
      const headerMap: Record<string, keyof UploadRowCourse> = {
        ID: "id",
        Code: "code",
        Title: "title",
        Description: "description",
        Order: "order",
        Data: "data",
        Tag: "tag",
        Active: "active",
      };

      const fileHeader = Object.keys(rawJson[0] as object);
      const expectedHeadersWithId = [
        "ID",
        "Code",
        "Title",
        "Description",
        "Order",
        "Data",
        "Tag",
        "Active",
      ];
      const expectedHeadersWithoutId = expectedHeadersWithId.slice(1); // drop ID

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

      // Convert friendly headers to internal keys
      const mappedJson: UploadRowCourse[] = rawJson.map((row: any) => {
        const mappedRow: Partial<UploadRowCourse> = {};
        Object.entries(headerMap).forEach(([friendly, key]) => {
          if (row[friendly] !== undefined) {
            mappedRow[key] = row[friendly];
          }
        });
        return mappedRow as UploadRowCourse;
      });

      // Validate required fields
      const requiredFields: (keyof UploadRowCourse)[] = [
        "code",
        "title",
        "description",
        "order",
        "data",
        "tag",
        "active",
      ];
      const json = mappedJson.filter((row) =>
        requiredFields.every(
          (field) => row[field] !== undefined && row[field] !== ""
        )
      );

      const skipped = mappedJson.length - json.length;
      if (skipped > 0) {
        alert(`${skipped} incomplete row(s) were skipped during validation.`);
      }

      // Check for duplicate values
      const keyFields: (keyof UploadRowCourse)[] = [
        "code",
        "title",
        "description",
        "order",
      ];
      const duplicates: string[] = [];

      keyFields.forEach((field) => {
        const seen = new Set();
        json.forEach((row, index) => {
          const value = row[field];
          if (seen.has(value)) {
            duplicates.push(
              `Duplicate value "${value}" found in field "${field}" at row ${
                index + 2
              }`
            );
          }
          seen.add(value);
        });
      });

      if (duplicates.length > 0) {
        alert(
          "Duplicate values found:\n" +
            duplicates.join("\n") +
            "\n\nPlease check the file and try again."
        );
        return;
      }

      setPreviewData(json);
      setHeaders(Object.keys(json[0] || {}));
      setModalOpen(true);
    };

    reader.readAsArrayBuffer(file);
    e.target.value = ""; // allow reupload of same file
  };

  const handleFileDownload = async () => {
    const file = await axios.get("http://localhost:3001/api/courses/download", {
      responseType: "blob",
    });
    const url = URL.createObjectURL(file.data);
    const link = document.createElement("a");
    link.href = url;
    link.download = "courses.xlsx";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const confirmImport = async () => {
    console.log("Import confirmed:", previewData);
    try {
      setImportLoading(true)
      await axios.post("http://localhost:3001/api/courses/mass-create", {
        data: previewData,
      });
      setImportLoading(false)
      alert("Data imported successfully!");

      setModalOpen(false);
      const updatedRes = await axios.get<Course[]>(
        "http://localhost:3001/api/courses"
      );
      setCourses(updatedRes.data);
    } catch (error: any) {
      const errors = error.response.data.errors;

      setModalOpen(false);

      if (errors.length > 0) {
        setImportErrors(errors);
        setErrorModalOpen(true);
      } else {
        alert(
          "Unexpected error: " +
            (error.response?.data?.message || error.message)
        );
      }
    }
  };

  return (
    <div className="p-6 max-w-full">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
        <h1 className="text-4xl font-bold text-gray-800">Course Management</h1>
        <div className="flex gap-2">
          <button
            onClick={handleFileDownload}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 shadow-sm transition"
          >
            ⬇️ Download
          </button>
          <button
            onClick={handleImportClick}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 shadow-sm transition"
          >
            ⬆️ Import
          </button>
          <input
            type="file"
            accept=".xlsx,.xls"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
      </div>

      {loading ? (
        <div className="text-center text-gray-500">Loading Course...</div>
      ) : (
        <div className="bg-gray-50 shadow-md rounded-lg p-4">
          <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
            <table className="min-w-[1000px] w-full text-sm text-left border-none">
              <thead className="bg-blue-100 text-gray-700 uppercase text-xs">
                <tr>
                  <th className="px-4 py-3">ID</th>
                  <th className="px-4 py-3">Code</th>
                  <th className="px-4 py-3">Title</th>
                  <th className="px-4 py-3">Description</th>
                  <th className="px-4 py-3">Order</th>
                  <th className="px-4 py-3">Data</th>
                  <th className="px-4 py-3">Tag</th>
                  <th className="px-4 py-3">Active</th>
                  <th className="px-4 py-3">Created</th>
                  <th className="px-4 py-3">Updated</th>
                </tr>
              </thead>
              <tbody>
                {courses.length > 0 ? (
                  courses.map((course, index) => (
                    <tr
                      key={course.id}
                      className={
                        index === courses.length - 1
                          ? ""
                          : "border-b border-gray-500"
                      }
                    >
                      <td className="px-4 py-2">{course.id}</td>
                      <td className="px-4 py-2">{course.code}</td>
                      <td className="px-4 py-2">{course.title}</td>
                      <td className="px-4 py-2">{course.description}</td>
                      <td className="px-4 py-2">{course.order}</td>
                      <td className="px-4 py-2 text-xs">
                        {JSON.stringify(course.data)}
                      </td>
                      <td className="px-4 py-2 capitalize font-bold">{course.tag}</td>
                      <td className="px-4 py-2">
                        <span
                          className={`px-2 py-1 rounded text-xs font-medium ${
                            course.active
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {course.active == 1 ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td className="px-4 py-2 text-gray-500 text-xs">
                        {new Date(course.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-2 text-gray-500 text-xs">
                        {new Date(course.updatedAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={11} className="text-center py-6 text-gray-500">
                      No courses found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            <PreviewModal
              isOpen={modalOpen}
              onClose={() => setModalOpen(false)}
              onConfirm={confirmImport}
              data={previewData}
              headers={headers}
              isLoading={importLoading}
            />

            {errorModalOpen && (
              <ImportErrorModal
                errors={importErrors}
                onClose={() => setErrorModalOpen(false)}
              />
            )}
          </div>
        </div>
      )}

      <div className="flex justify-center mt-4 space-x-2">
        <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1} className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50">Prev</button>
        <span className="px-4 py-1">{`Page ${page} of ${totalPages}`}</span>
        <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50">Next</button>
      </div>
    </div>
  );
}

export default MainCoursePage;
