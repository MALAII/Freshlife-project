import { axiosInstance } from "./config";

/* ➕ Add Category */
export const addCategory = (data) => {
  return axiosInstance.post("/categories", data);
};

/* 📄 Get All Categories */
export const getCategories = () => {
  return axiosInstance.get("/categories");
};

/* ✏️ Update Category */
export const updateCategory = (id, data) => {
  return axiosInstance.put(`/categories/${id}`, data);
};

/* ❌ Delete Category */
export const deleteCategory = (id) => {
  return axiosInstance.delete(`/categories/${id}`);
};
