import axiosInstance from "@/api/apiClient";
import { Book } from "@/types";

export const getBooks = async () => {
  const response = await axiosInstance.get("/books");
  return response.data;
};
