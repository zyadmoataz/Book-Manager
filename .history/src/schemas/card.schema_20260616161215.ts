import z from "zod";

export const CartItemSchema = z
  .object({
    id: z.union([z.string(), z.number()]),
    programId: z.string().optional().nullable(),
    programName: z.string().optional().nullable(),
    unitPrice: z.number().optional().nullable(),
    totalPrice: z.number().optional().nullable(),
    quantity: z.number().optional().nullable(),
    itemType: z.string().optional().nullable(),
    groupBookingId: z.string().optional().nullable(),
  })
  .passthrough();
