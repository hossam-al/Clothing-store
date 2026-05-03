import axiosInstance from "./axiosInstance";

export const getCart = () => axiosInstance.get("/cart");

export const addToCart = ({ variantId, quantity = 1 }) =>
  axiosInstance.post("/cart", {
    variant_id: variantId,
    quantity,
  });

export const updateCartItem = (cartItemId, quantity) =>
  axiosInstance.put(`/cart/${cartItemId}`, { quantity });

export const removeFromCart = (cartItemId) =>
  axiosInstance.delete(`/cart/${cartItemId}`);

export const clearCart = () => axiosInstance.delete("/cart");
