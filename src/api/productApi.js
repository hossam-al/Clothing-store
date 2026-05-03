import axiosInstance from "./axiosInstance";

export const getProducts = (params = {}) =>
  axiosInstance.get("/products", {
    params: {
      is_active: 1,
      sort_by: "created_at",
      sort_direction: "desc",
      ...params,
    },
  });

export const getProductById = (id) => axiosInstance.get(`/products/${id}`);

export const getProductReviews = (productId, params = {}) =>
  axiosInstance.get(`/products/${productId}/reviews`, {
    params: {
      status: "approved",
      ...params,
    },
  });

export const createProductReview = (productId, reviewData) =>
  axiosInstance.post(`/products/${productId}/reviews`, reviewData);

export const updateProductReview = (productId, reviewData) =>
  axiosInstance.put(`/products/${productId}/reviews`, reviewData);

export const deleteProductReview = (productId) =>
  axiosInstance.delete(`/products/${productId}/reviews`);
