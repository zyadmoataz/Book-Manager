import z from "zod";

export const CartItemSchema = z
  .object({
    title: z.string(),
    author: z.string(),
    year: z.number(),
  })
  .passthrough();
