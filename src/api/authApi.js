import axiosInstance from "./axiosInstance";

export const login = (credentials) => axiosInstance.post("/login", credentials);
export const register = (userData) => axiosInstance.post("/register", userData);
export const updateProfile = (profileData) =>
  axiosInstance.post("/update", profileData);
export const logout = () => axiosInstance.post("/logout");
export const deleteCurrentUser = () => axiosInstance.delete("/deleteUser");
export const forgotPassword = (email) =>
  axiosInstance.post("/forgot-password", { email });
export const resendVerificationEmail = (email) =>
  axiosInstance.post("/email/verification-notification", { email });
