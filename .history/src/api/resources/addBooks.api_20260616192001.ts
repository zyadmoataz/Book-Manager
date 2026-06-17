export const fetchProfile = async (config = {}) => {
  const response = await axiosInstance.get("/auth/profile", config);
  return response.data;
};

export const updateProfile = async (id, data) => {
  const response = await axiosInstance.patch(`/customers/${id}`, data);
  return response.data;
};

export const changePasswordApi = async (data) => {
  const response = await axiosInstance.post("/auth/change-password", data);
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

export const removeProfilePictureApi = async () => {
  const response = await axiosInstance.delete("/customers/me/profile-picture");
  return response.data;
};
