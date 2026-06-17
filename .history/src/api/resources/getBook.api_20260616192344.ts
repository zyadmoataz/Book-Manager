import axiosInstance from "@/api/apiClient";
import { Book } from "@/types";

export const getBooks = async (data: Book) => {
  const response = await axiosInstance.post("/books", data);
  return response.data;
};
