import z from "zod";

export const bookSchema = z.object({
  title: z.string().min(2, { message: "Title must be at least 2 characters" }),
  author: z
    .string()
    .min(2, { message: "Author must be at least 2 characters" }),
  genre: z.string().min(1, { message: "Please select a genre" }),
  year: z
    .number()
    .min(1000, { message: "Invalid year" })
    .max(new Date().getFullYear(), { message: "Year cannot be in the future" }),
  cover: z.string().url({ message: "Must be a valid URL" }).or(z.literal("")), // optional fallback
  read: z.boolean(),
  tags: z.array(
    z.object({
      name: z.string().min(1, "Tag cannot be empty"),
    }),
  ),
});
