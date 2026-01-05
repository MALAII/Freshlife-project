import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  addCategory,
  getCategories,
  updateCategory,
  deleteCategory,
} from "../apis/categoryApi";

import { FiEdit2, FiTrash2 } from "react-icons/fi";

const Settings = () => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const res = await getCategories();
    setCategories(res.data.data);
  };

  const handleSave = async () => {
    if (!name.trim()) {
      toast.error("Enter category name");
      return;
    }

    editId
      ? await updateCategory(editId, { name })
      : await addCategory({ name });

    toast.success(editId ? "Category updated" : "Category added");

    setName("");
    setEditId(null);
    setOpen(false);
    fetchCategories();
  };

  const handleEdit = (cat) => {
    setName(cat.name);
    setEditId(cat._id);
    setOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this category?")) return;
    await deleteCategory(id);
    toast.success("Category deleted");
    fetchCategories();
  };

  return (
    <div className=" ">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">
          Categories
        </h2>
        <button
          onClick={() => {
            setName("");
            setEditId(null);
            setOpen(true);
          }}
          className="bg-purple-600 text-white px-4 py-2 hover:bg-purple-700 transition"
        >
          + Add Category
        </button>
      </div>

<div className="bg-white shadow divide-y">
  {categories.length ? (
    categories.map((c, i) => (
      <div
        key={c._id}
        className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition"
      >
        {/* Left */}
        <div className="flex items-center gap-4">
          <div className="text-sm text-gray-400 w-6">
            {i + 1}.
          </div>

          <div>
            <div className="font-medium text-gray-900">
              {c.name}
            </div>
            <div className="text-xs text-gray-500">
              Category
            </div>
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => handleEdit(c)}
            className="text-gray-500 hover:text-purple-600 transition"
            title="Edit"
          >
            <FiEdit2 size={16} />
          </button>

          <button
            onClick={() => handleDelete(c._id)}
            className="text-gray-500 hover:text-red-600 transition"
            title="Delete"
          >
            <FiTrash2 size={16} />
          </button>
        </div>
      </div>
    ))
  ) : (
    <div className="py-12 text-center text-gray-400">
      No categories available
    </div>
  )}
</div>


      {/* Modal */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white w-full max-w-sm shadow-xl">

            {/* Header */}
            <div className="px-5 py-3 border-b flex justify-between items-center">
              <h3 className="text-base font-semibold text-gray-800">
                {editId ? "Edit Category" : "Add Category"}
              </h3>
              <button
                onClick={() => {
                  setOpen(false);
                  setEditId(null);
                }}
                className="text-gray-500 hover:text-black"
              >
                ✕
              </button>
            </div>

            {/* Body */}
            <div className="p-5">
              <label className="text-sm text-gray-600 mb-1 block">
                Category Name
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border px-3 py-2 focus:outline-none focus:border-purple-600"
                placeholder="Enter category name"
              />
            </div>

            {/* Footer */}
            <div className="px-5 py-3 border-t flex justify-end gap-2 bg-gray-50">
              <button
                onClick={() => {
                  setOpen(false);
                  setEditId(null);
                }}
                className="px-4 py-2 border text-gray-700 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-5 py-2 bg-purple-600 text-white hover:bg-purple-700 transition"
              >
                {editId ? "Update Category" : "Save Category"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;
