import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postBooks } from "../resources/postBooks.api";

export const useAddBook = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postBooks,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
    },
  });
};
