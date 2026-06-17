import axiosInstance from "@/api/apiClient";

export const fetchProfile = async (config = {}) => {
  const response = await axiosInstance.get("/auth/profile", config);
  return response.data;
};
