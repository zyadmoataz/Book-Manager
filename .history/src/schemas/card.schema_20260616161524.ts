import z from "zod";

export const CartItemSchema = z
  .object({
    title: z.string(),
    author: z.string(),
    year: z
      .number()
      .transform((val) => val.toString())
      .refine((val) => val.length === 4, "Year must be a 4-digit number")
      .refine((val) => /^[0-9]{4}$/.test(val), "Year must be a 4-digit number")
      .transform((val) => Number(val)),
    genre: z.enum(["fiction", "non-fiction", "science", "history", "other"]),
  })
  .passthrough();
