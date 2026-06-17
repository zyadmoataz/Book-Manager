import axiosInstance from "@/api/apiClient";

export const getBooks = async () => {
  const response = await axiosInstance.get("/books");
  return response.data;
};

export const getBookById = async (id: number) => {
  const response = await axiosInstance.get(`/books/${id}`);
  return response.data;
};
