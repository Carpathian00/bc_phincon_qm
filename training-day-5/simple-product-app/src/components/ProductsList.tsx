import React, { useEffect, useState } from "react";
import AddProductModal from "./AddProductModal";
import EditProductModal from "./EditProductModal";
import { Product }  from "../types/ProductType";

const ProductsList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    setLoading(true);
    fetch("http://localhost:3000/api/products")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch products");
        return res.json();
      })
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        console.error(err.message);
        setLoading(false);
      });
  };

  const handleDelete = (id: number) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (!confirmDelete) { return };
    fetch("http://localhost:3000/api/products/" + id, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to delete product");
        return res.json();
      })
      .then(() => {
        fetchProducts(); // refresh the products after deletion
      })
      .catch((err) => {
        alert("Failed to delete product: " + err.message);
        console.error(err);
      });

  };

  const handleProductAdded = () => {
    fetchProducts(); // refresh the products after a new product is added
  };

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (error)
    return <div className="text-center py-8 text-red-500">{error}</div>;

  return (
    <div className="max-w-6xl mx-auto p-4 relative">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-4xl font-bold text-center w-full">All Products</h1>
        <button
          className="ml-auto bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded shadow transition-colors duration-200"
          type="button"
          onClick={() => setIsModalOpen(true)}
        >
          Add Product
        </button>
      </div>

      {/* Add Product Modal */}
      {isModalOpen && (
        <AddProductModal
          onClose={() => setIsModalOpen(false)}
          onProductAdded={handleProductAdded}
        />
      )}

      {/* Products Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 rounded-xl shadow-lg">
          <thead>
            <tr className="bg-gradient-to-r from-blue-100 to-blue-200">
              <th className="px-4 py-3 border-b font-semibold text-gray-700 uppercase tracking-wider">
                #
              </th>
              <th className="px-4 py-3 border-b font-semibold text-gray-700 uppercase tracking-wider">
                Item ID
              </th>
              <th className="px-4 py-3 border-b font-semibold text-gray-700 uppercase tracking-wider">
                Name
              </th>
              <th className="px-4 py-3 border-b font-semibold text-gray-700 uppercase tracking-wider">
                Description
              </th>
              <th className="px-4 py-3 border-b font-semibold text-gray-700 uppercase tracking-wider">
                Price
              </th>
              <th className="px-4 py-3 border-b font-semibold text-gray-700 uppercase tracking-wider">
                Category
              </th>
              <th className="px-4 py-3 border-b font-semibold text-gray-700 uppercase tracking-wider">
                Stock
              </th>
              <th className="px-4 py-3 border-b font-semibold text-gray-700 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-4">
                  No products found.
                </td>
              </tr>
            ) : (
              products.map((product, index) => (
                <tr
                  key={product.id}
                  className="hover:bg-blue-100 hover:text-blue-800 transition-colors duration-200 cursor-pointer"
                >
                  <td className="px-4 py-2 border-b">{index + 1}</td>
                  <td className="px-4 py-2 border-b">{product.id}</td>
                  <td className="px-4 py-2 border-b font-medium">
                    {product.name}
                  </td>
                  <td className="px-4 py-2 border-b">
                    {product.description || "-"}
                  </td>
                  <td className="px-4 py-2 border-b">${product.price}</td>
                  <td className="px-4 py-2 border-b">
                    {product.category || "-"}
                  </td>
                  <td className="px-4 py-2 border-b">{product.stock ?? "-"}</td>
                  <td className="px-4 py-2 border-b sm:px-6">
                    <div className="flex items-center justify-center sm:justify-start space-x-2">
                      <button
                        className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded shadow transition-colors duration-200"
                        type="button"
                        onClick={() => setEditingProduct(product)}
                      >
                        Edit
                      </button>

                      {editingProduct && (
                        <EditProductModal
                          product={editingProduct}
                          onClose={() => setEditingProduct(null)}
                          onProductUpdated={handleProductAdded}
                        />
                      )}

                      <button
                        className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded shadow transition-colors duration-200"
                        type="button"
                        onClick = {() => handleDelete(product.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductsList;
