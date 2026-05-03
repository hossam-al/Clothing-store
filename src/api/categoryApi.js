import axiosInstance from "./axiosInstance";

export const getCategories = (params = {}) =>
  axiosInstance.get("/categories", { params });

export const getCategoryById = (categoryId) =>
  axiosInstance.get(`/categories/${categoryId}`);
