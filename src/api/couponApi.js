import axiosInstance from "./axiosInstance";

export const getCoupons = () => axiosInstance.get("/coupons");
export const validateCoupon = (couponData) =>
  axiosInstance.post("/coupons/validate", couponData);
