import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
  addProduct,
  getProducts,
  deleteProduct,
  updateProduct,
} from "../apis/productApi";
import { getCategories } from "../apis/categoryApi";

import { FiEye, FiEdit2, FiTrash2 } from "react-icons/fi";
const Products = () => {
  const [open, setOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);
  const [editId, setEditId] = useState(null);

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [viewProduct, setViewProduct] = useState(null);

  const [form, setForm] = useState({
    name: "",
    quantity: "",
    manufactureDate: "",
    expiryDate: "",
    category: "",
    price: "",
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await getProducts();
      setProducts(res.data.data);
    } catch {
      toast.error("Failed to fetch products");
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await getCategories();
      setCategories(res.data.data);
    } catch {
      toast.error("Failed to fetch categories");
    }
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSave = async () => {
    if (!form.category) {
      toast.error("Select category");
      return;
    }

    try {
      editId
        ? await updateProduct(editId, form)
        : await addProduct(form);

      toast.success(editId ? "Product updated" : "Product added");

      setOpen(false);
      setEditId(null);
      setForm({
        name: "",
        quantity: "",
        manufactureDate: "",
        expiryDate: "",
        category: "",
        price: "",
      });
      fetchProducts();
    } catch {
      toast.error("Save failed");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    try {
      await deleteProduct(id);
      toast.success("Product deleted");
      fetchProducts();
    } catch {
      toast.error("Delete failed");
    }
  };

  const handleEdit = (p) => {
    setForm({
      name: p.name,
      quantity: p.quantity,
      manufactureDate: p.manufactureDate.split("T")[0],
      expiryDate: p.expiryDate.split("T")[0],
      category: p.category,
      price: p.price,
    });
    setEditId(p._id);
    fetchCategories();
    setOpen(true);
  };
const getExpiryStatus = (date) => {
  const diff =
    (new Date(date).setHours(0, 0, 0, 0) -
      new Date().setHours(0, 0, 0, 0)) /
    86400000;

  if (diff < 0)
    return {
      label: "Expired",
      bg: "bg-red-100",
      text: "text-red-700",
    };

  if (diff === 0)
    return {
      label: "Expires Today",
      bg: "bg-yellow-100",
      text: "text-yellow-800",
    };

  return {
    label: `Expires in ${Math.ceil(diff)} days`,
    bg: "bg-green-100",
    text: "text-green-700",
  };
};


  return (
    <div className="    ">
  
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">
          Products
        </h2>
        <button
          onClick={() => {
            setEditId(null);
            fetchCategories();
            setOpen(true);
          }}
          className="bg-purple-600 text-white px-4 py-2 hover:bg-purple-700 transition"
        >
          + Add Product
        </button>
      </div>

   

<div className="bg-white shadow overflow-x-auto">
  <table className="w-full text-sm text-gray-700">
    {/* Header */}
    <thead className="bg-gray-50 border-b">
      <tr>
        <th className="px-5 py-4 font-semibold">S.No</th>
        <th className="px-5 py-4 font-semibold">Product</th>
        <th className="px-5 py-4 font-semibold">Category</th>
        <th className="px-5 py-4 font-semibold">Expiry</th>
        <th className="px-5 py-4 font-semibold">Status</th>
        <th className="px-5 py-4 font-semibold text-right">
          Actions
        </th>
      </tr>
    </thead>

    {/* Body */}
    <tbody>
      {products.length ? (
        products.map((p, i) => (
          <tr
            key={p._id}
            className="border-b text-center hover:bg-gray-50 transition"
          >
            {/* Index */}
            <td className="px-5 py-4 text-gray-500">
              {i + 1}
            </td>

            {/* Product */}
            <td className="px-5 py-4">
              <div className="font-medium text-gray-900">
                {p.name}
              </div>
            </td>

            {/* Category */}
            <td className="px-5 py-4 text-gray-600">
              {p.category}
            </td>

            {/* Expiry */}
            <td className="px-5 py-4">
              {new Date(p.expiryDate).toLocaleDateString()}
            </td>

            <td className="px-5 py-4">
  {(() => {
    const status = getExpiryStatus(p.expiryDate);
    return (
      <span
        className={`inline-flex px-3 py-1 text-xs font-medium ${status.bg} ${status.text}`}
      >
        {status.label}
      </span>
    );
  })()}
</td>

            {/* Actions */}
            <td className="px-5 py-4">
              <div className="flex justify-end items-center gap-4">
                {/* View */}
                <button
                  onClick={() => {
                    setViewProduct(p);
                    setViewOpen(true);
                  }}
                  className="text-gray-500 hover:text-blue-600 transition"
                  title="View"
                >
                  <FiEye size={16} />
                </button>

                {/* Edit */}
                <button
                  onClick={() => handleEdit(p)}
                  className="text-gray-500 hover:text-purple-600 transition"
                  title="Edit"
                >
                  <FiEdit2 size={16} />
                </button>

                {/* Delete */}
                <button
                  onClick={() => handleDelete(p._id)}
                  className="text-gray-500 hover:text-red-600 transition"
                  title="Delete"
                >
                  <FiTrash2 size={16} />
                </button>
              </div>
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td
            colSpan={6}
            className="py-10 text-center text-gray-400"
          >
            No products available
          </td>
        </tr>
      )}
    </tbody>
  </table>
</div>


{/* Modal */}
{(open || viewOpen) && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
    <div className="bg-white w-full max-w-lg shadow-xl">

      {/* Header */}
      <div className="px-5 py-3 border-b flex justify-between items-center">
        <h3 className="text-base font-semibold text-gray-800">
          {viewOpen
            ? "Product Details"
            : editId
            ? "Edit Product"
            : "Add Product"}
        </h3>
        <button
          onClick={() => {
            setOpen(false);
            setViewOpen(false);
          }}
          className="text-gray-500 hover:text-black"
        >
          ✕
        </button>
      </div>

      {/* Body */}
      <div className="p-5">
        {viewOpen ? (
          <div className="grid grid-cols-2 gap-y-3 text-sm">
            <div className="text-gray-500">Name</div>
            <div className="font-medium">{viewProduct.name}</div>

            <div className="text-gray-500">Category</div>
            <div className="font-medium">{viewProduct.category}</div>

            <div className="text-gray-500">Quantity</div>
            <div className="font-medium">{viewProduct.quantity}</div>

            <div className="text-gray-500">Manufacture Date</div>
            <div className="font-medium">
              {new Date(viewProduct.manufactureDate).toLocaleDateString()}
            </div>

            <div className="text-gray-500">Expiry Date</div>
            <div className="font-medium">
              {new Date(viewProduct.expiryDate).toLocaleDateString()}
            </div>

            <div className="text-gray-500">Price</div>
            <div className="font-medium text-purple-600">
              ₹{viewProduct.price}
            </div>
          </div>
        ) : (
          <div className="grid gap-4">
            {/* Name */}
            <div>
              <label className="text-sm text-gray-600 mb-1 block">
                Product Name
              </label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full border px-3 py-2 focus:outline-none focus:border-purple-600"
              />
            </div>

            {/* Quantity & Price */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm text-gray-600 mb-1 block">
                  Quantity
                </label>
                <input
                  type="number"
                  name="quantity"
                  value={form.quantity}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 focus:outline-none focus:border-purple-600"
                />
              </div>

              <div>
                <label className="text-sm text-gray-600 mb-1 block">
                  Price
                </label>
                <input
                  type="number"
                  name="price"
                  value={form.price}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 focus:outline-none focus:border-purple-600"
                />
              </div>
            </div>

            {/* Dates */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm text-gray-600 mb-1 block">
                  Manufacture Date
                </label>
                <input
                  type="date"
                  name="manufactureDate"
                  value={form.manufactureDate}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 focus:outline-none focus:border-purple-600"
                />
              </div>

              <div>
                <label className="text-sm text-gray-600 mb-1 block">
                  Expiry Date
                </label>
                <input
                  type="date"
                  name="expiryDate"
                  value={form.expiryDate}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 focus:outline-none focus:border-purple-600"
                />
              </div>
            </div>

            {/* Category */}
            <div>
              <label className="text-sm text-gray-600 mb-1 block">
                Category
              </label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full border px-3 py-2 bg-white focus:outline-none focus:border-purple-600"
              >
                <option value="">Select Category</option>
                {categories.map((c) => (
                  <option key={c._id} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="px-5 py-3 border-t flex justify-end gap-2 bg-gray-50">
        <button
          onClick={() => {
            setOpen(false);
            setViewOpen(false);
          }}
          className="px-4 py-2 border text-gray-700 hover:bg-gray-100"
        >
          Cancel
        </button>

        {!viewOpen && (
          <button
            onClick={handleSave}
            className="px-5 py-2 bg-purple-600 text-white hover:bg-purple-700 transition"
          >
            {editId ? "Update Product" : "Save Product"}
          </button>
        )}
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default Products;
