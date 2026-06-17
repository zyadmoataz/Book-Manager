import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createBook } from "../resources/createBook.api";

export const useAddBook = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createBook,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
    },
  });
};
