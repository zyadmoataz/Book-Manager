import axiosInstance from "@/api/apiClient";

export const fetchProfile = async (config = {}) => {
  const response = await axiosInstance.get("/auth/profile", config);
  return response.data;
};

export const uploadProfilePictureApi = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  const response = await axiosInstance.post(
    "/customers/me/profile-picture",
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
    },
  );
  return response.data;
};
