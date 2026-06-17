import { useQueryClient } from "@tanstack/react-query";

export const useCreateCustomer = () => {
  const queryClient = useQueryClient();

  return pack(
    useMutation({
      mutationFn: createCustomerApi,
      onSuccess: (data) => {
        const updatedUser = {
          ...authUser,
          ...data,
          id: authUser?.id || data?.id || data?.userId,
          email: authUser?.email || data?.email || "",
        };
        dispatch(setCredentials({ user: updatedUser, customerId: data.id }));
        queryClient.invalidateQueries({ queryKey: ["customer"] });
      },
    }),
  );
};
