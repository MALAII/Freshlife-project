import { axiosInstance } from "./config";

/* ➕ Add Product */
export const addProduct = (data) => {
  return axiosInstance.post("/products", data);
};

/* 📄 Get All Products */
export const getProducts = () => {
  return axiosInstance.get("/products");
};

/* ✏️ Update Product */
export const updateProduct = (id, data) => {
  return axiosInstance.put(`/products/${id}`, data);
};

/* ❌ Delete Product */
export const deleteProduct = (id) => {
  return axiosInstance.delete(`/products/${id}`);
};
