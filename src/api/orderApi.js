import axiosInstance from "./axiosInstance";

export const getOrders = () => axiosInstance.get("/orders");
export const getOrderById = (orderId) => axiosInstance.get(`/orders/${orderId}`);
export const createOrderFromCart = (orderData) =>
  axiosInstance.post("/orders", orderData);
export const updateOrderNotes = (orderId, notes) =>
  axiosInstance.put(`/orders/${orderId}`, { notes });
export const deleteOrder = (orderId) => axiosInstance.delete(`/orders/${orderId}`);
