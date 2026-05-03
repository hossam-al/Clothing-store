import axiosInstance from "./axiosInstance";

export const getGovernorates = () => axiosInstance.get("/governorates");
export const getGovernorateById = (governorateId) =>
  axiosInstance.get(`/governorates/${governorateId}`);
