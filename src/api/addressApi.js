import axiosInstance from "./axiosInstance";

export const getAddresses = () => axiosInstance.get("/addresses");
export const getAddressById = (addressId) =>
  axiosInstance.get(`/addresses/${addressId}`);
export const createAddress = (addressData) =>
  axiosInstance.post("/addresses", addressData);
export const updateAddress = (addressId, addressData) =>
  axiosInstance.patch(`/addresses/${addressId}`, addressData);
export const deleteAddress = (addressId) =>
  axiosInstance.delete(`/addresses/${addressId}`);
