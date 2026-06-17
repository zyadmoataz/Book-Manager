import axiosInstance from "@/api/apiClient";

export const toggleBookReadStatus = async ({ id, read }: { id: number; read: boolean }) => {
  const response = await axiosInstance.patch(`/books/${id}`, { read });
  return response.data;
};
