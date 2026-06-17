import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toggleBookReadStatus } from "../resources/updateBook.api";
import { Book } from "@/types";

export const useToggleReadMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: toggleBookReadStatus,
    // When the API successfully updates the book, we just tell React Query 
    // to instantly refetch the updated data! This is much simpler than manual cache updates.
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
      queryClient.invalidateQueries({ queryKey: ["book", variables.id] });
    },
  });
};
