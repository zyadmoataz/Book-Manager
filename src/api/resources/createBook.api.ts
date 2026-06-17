import axiosInstance from "@/api/apiClient";
import { Book } from "@/types";

export const createBook = async (data: Book) => {
  const response = await axiosInstance.post("/books", data);
  return response.data;
};

export const updateBooks = async (id: number, data: Book) => {
  const response = await axiosInstance.put(`/books/${id}`, data);
  return response.data;
};
