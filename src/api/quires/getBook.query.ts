import { useQuery } from "@tanstack/react-query";
import { getBookById, getBooks } from "../resources/getBook.api";

export const useBooks = () => {
  const query = useQuery({
    queryKey: ["books"],
    queryFn: getBooks,
    staleTime: 10 * 60 * 1000,
  });

  return {
    data: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
};

// query to get book by id
export const useBookById = (id: number) => {
  const query = useQuery({
    queryKey: ["book", id],
    queryFn: () => getBookById(id),
    staleTime: 10 * 60 * 1000,
  });

  return {
    data: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
};
