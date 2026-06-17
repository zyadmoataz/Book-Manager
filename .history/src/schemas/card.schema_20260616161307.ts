import z from "zod";

export const CartItemSchema = z
  .object({
    title: z.string(),
  })
  .passthrough();
