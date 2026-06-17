import axiosInstance from "@/api/apiClient";
import { Book } from "@/types";

export const postBooks = async () => {
  const response = await axiosInstance.post("/books");
  return response.data;
};
