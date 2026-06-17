import z from "zod";

export const CartItemSchema = z
  .object({
    title: z.string(),
    author: z.string(),
    startDate: z.string(),
    endDate: z.string(),
    location: z.string(),
  })
  .passthrough();
