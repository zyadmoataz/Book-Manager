import PageLayout from "@/components/layout/PageLayout";
import { BookPlus, Plus, Trash2 } from "lucide-react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useAddBook } from "@/api/quires/postBook.query";
import { useNavigate } from "react-router-dom";
import axiosInstance from "@/api/apiClient";
import { useState } from "react";
import { bookSchema } from "@/schemas/card.schema";

type BookFormValues = z.infer<typeof bookSchema>;

export default function AddBooks() {
  const navigate = useNavigate();
  const addBookMutation = useAddBook();
  const [asyncError, setAsyncError] = useState<string | null>(null);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    getValues,
  } = useForm<BookFormValues>({
    resolver: zodResolver(bookSchema),
    defaultValues: {
      title: "",
      author: "",
      genre: "",
      year: new Date().getFullYear(),
      cover: "",
      read: false,
      tags: [{ name: "" }],
    },
    mode: "onBlur", // Validate on blur for better UX
  });

  const { fields, append, remove } = useFieldArray({
    name: "tags",
    control,
  });

  // Manual async title validation
  const checkUniqueTitle = async () => {
    const title = getValues("title");
    if (!title) return true;

    try {
      const res = await axiosInstance.get(
        `/books?title=${encodeURIComponent(title)}`,
      );
      if (res.data && res.data.length > 0) {
        setAsyncError("This exact title already exists in the library!");
        return false;
      }
      setAsyncError(null);
      return true;
    } catch (e) {
      return true; // fail open
    }
  };

  const onSubmit = async (data: BookFormValues) => {
    // 1. Check uniqueness before submitting
    const isUnique = await checkUniqueTitle();
    if (!isUnique) return;

    // 2. Format tags
    const formattedData = {
      ...data,
      id: Date.now(), // Fake ID generation
      // If cover is empty, provide a fallback
      cover:
        data.cover ||
        "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=800&auto=format&fit=crop",
      tags: data.tags
        .filter((t) => t.name.trim() !== "")
        .map((t) => ({ id: Math.random().toString(), name: t.name })),
    };

    // 3. Mutate and navigate
    addBookMutation.mutate(formattedData as any, {
      onSuccess: () => {
        navigate("/");
      },
    });
  };

  return (
    <PageLayout>
      <div className='mx-auto max-w-3xl'>
        <div className='mb-8'>
          <h1 className='text-3xl font-bold tracking-tight text-slate-900 dark:text-white'>
            Add a New Book
          </h1>
          <p className='mt-2 text-slate-600 dark:text-slate-400'>
            Expand your library by adding a new book to your collection.
          </p>
        </div>

        <div className='overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm transition-colors duration-300'>
          <div className='border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50 p-6 sm:p-8'>
            <div className='flex items-center gap-3'>
              <div className='flex h-10 w-10 items-center justify-center rounded-lg bg-primary-100 text-primary-600 dark:bg-primary-900/50 dark:text-primary-400'>
                <BookPlus className='h-5 w-5' />
              </div>
              <div>
                <h2 className='text-lg font-semibold text-slate-900 dark:text-white'>
                  Book Information
                </h2>
                <p className='text-sm text-slate-500 dark:text-slate-400'>
                  Please provide the details below.
                </p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className='p-6 sm:p-8'>
            <div className='grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2'>
              {/* Title */}
              <div className='sm:col-span-2'>
                <label
                  htmlFor='title'
                  className='block text-sm font-medium leading-6 text-slate-900 dark:text-slate-200'
                >
                  Book Title
                </label>
                <div className='mt-2'>
                  <input
                    {...register("title")}
                    onBlur={(e) => {
                      register("title").onBlur(e);
                      checkUniqueTitle();
                    }}
                    type='text'
                    id='title'
                    placeholder='e.g. The Pragmatic Programmer'
                    className='block w-full rounded-xl border-0 py-2.5 px-3.5 text-slate-900 dark:text-white dark:bg-slate-800 shadow-sm ring-1 ring-inset ring-slate-300 dark:ring-slate-700 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6'
                  />
                  {errors.title && (
                    <p className='mt-2 text-sm text-red-500'>
                      {errors.title.message}
                    </p>
                  )}
                  {asyncError && (
                    <p className='mt-2 text-sm text-red-500'>{asyncError}</p>
                  )}
                </div>
              </div>

              {/* Author */}
              <div>
                <label
                  htmlFor='author'
                  className='block text-sm font-medium leading-6 text-slate-900 dark:text-slate-200'
                >
                  Author
                </label>
                <div className='mt-2'>
                  <input
                    {...register("author")}
                    type='text'
                    id='author'
                    placeholder='e.g. Andy Hunt'
                    className='block w-full rounded-xl border-0 py-2.5 px-3.5 text-slate-900 dark:text-white dark:bg-slate-800 shadow-sm ring-1 ring-inset ring-slate-300 dark:ring-slate-700 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6'
                  />
                  {errors.author && (
                    <p className='mt-2 text-sm text-red-500'>
                      {errors.author.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Genre */}
              <div>
                <label
                  htmlFor='genre'
                  className='block text-sm font-medium leading-6 text-slate-900 dark:text-slate-200'
                >
                  Genre
                </label>
                <div className='mt-2'>
                  <select
                    {...register("genre")}
                    id='genre'
                    className='block w-full rounded-xl border-0 py-2.5 px-3.5 text-slate-900 dark:text-white dark:bg-slate-800 shadow-sm ring-1 ring-inset ring-slate-300 dark:ring-slate-700 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6'
                  >
                    <option value=''>Select a genre</option>
                    <option value='tech'>Technology</option>
                    <option value='sci-fi'>Science Fiction</option>
                    <option value='fantasy'>Fantasy</option>
                    <option value='self-help'>Self-Help</option>
                    <option value='fiction'>Fiction</option>
                  </select>
                  {errors.genre && (
                    <p className='mt-2 text-sm text-red-500'>
                      {errors.genre.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Year */}
              <div>
                <label
                  htmlFor='year'
                  className='block text-sm font-medium leading-6 text-slate-900 dark:text-slate-200'
                >
                  Publication Year
                </label>
                <div className='mt-2'>
                  <input
                    {...register("year", { valueAsNumber: true })}
                    type='number'
                    id='year'
                    placeholder='e.g. 1999'
                    className='block w-full rounded-xl border-0 py-2.5 px-3.5 text-slate-900 dark:text-white dark:bg-slate-800 shadow-sm ring-1 ring-inset ring-slate-300 dark:ring-slate-700 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6'
                  />
                  {errors.year && (
                    <p className='mt-2 text-sm text-red-500'>
                      {errors.year.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Cover URL */}
              <div>
                <label
                  htmlFor='cover'
                  className='block text-sm font-medium leading-6 text-slate-900 dark:text-slate-200'
                >
                  Cover Image URL (Optional)
                </label>
                <div className='mt-2'>
                  <input
                    {...register("cover")}
                    type='url'
                    id='cover'
                    placeholder='https://...'
                    className='block w-full rounded-xl border-0 py-2.5 px-3.5 text-slate-900 dark:text-white dark:bg-slate-800 shadow-sm ring-1 ring-inset ring-slate-300 dark:ring-slate-700 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6'
                  />
                  {errors.cover && (
                    <p className='mt-2 text-sm text-red-500'>
                      {errors.cover.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Tags Field Array */}
              <div className='sm:col-span-2 mt-4 border-t border-slate-200 dark:border-slate-700 pt-6'>
                <div className='flex items-center justify-between mb-4'>
                  <label className='block text-sm font-medium leading-6 text-slate-900 dark:text-slate-200'>
                    Book Tags
                  </label>
                  <button
                    type='button'
                    onClick={() => append({ name: "" })}
                    className='text-xs flex items-center gap-1 text-primary-600 hover:text-primary-700 dark:text-primary-400 font-medium'
                  >
                    <Plus className='h-3 w-3' /> Add Tag
                  </button>
                </div>

                <div className='grid grid-cols-2 md:grid-cols-3 gap-3'>
                  {fields.map((field, index) => (
                    <div key={field.id} className='relative flex items-center'>
                      <input
                        {...register(`tags.${index}.name`)}
                        placeholder='e.g. Programming'
                        className='block w-full rounded-xl border-0 py-2 pl-3 pr-10 text-slate-900 dark:text-white dark:bg-slate-800 shadow-sm ring-1 ring-inset ring-slate-300 dark:ring-slate-700 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm'
                      />
                      <button
                        type='button'
                        onClick={() => remove(index)}
                        className='absolute right-2 text-slate-400 hover:text-red-500 transition-colors'
                      >
                        <Trash2 className='h-4 w-4' />
                      </button>
                    </div>
                  ))}
                </div>
                {errors.tags && (
                  <p className='mt-2 text-sm text-red-500'>
                    {errors.tags.message}
                  </p>
                )}
              </div>

              {/* Read Status */}
              <div className='sm:col-span-2 flex items-center gap-3 rounded-xl border border-slate-200 dark:border-slate-700 p-4 bg-slate-50 dark:bg-slate-800/50'>
                <input
                  {...register("read")}
                  type='checkbox'
                  id='read'
                  className='h-5 w-5 rounded border-slate-300 text-primary-600 focus:ring-primary-600'
                />
                <label
                  htmlFor='read'
                  className='text-sm font-medium text-slate-900 dark:text-slate-200'
                >
                  I have already read this book
                </label>
              </div>
            </div>

            <div className='mt-8 flex items-center justify-end gap-x-4 border-t border-slate-200 dark:border-slate-800 pt-6'>
              <button
                type='button'
                onClick={() => navigate("/")}
                className='text-sm font-semibold leading-6 text-slate-900 dark:text-slate-300 hover:text-slate-700'
              >
                Cancel
              </button>
              <button
                type='submit'
                disabled={isSubmitting || addBookMutation.isPending}
                className='rounded-xl bg-primary-600 px-8 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed'
              >
                {isSubmitting || addBookMutation.isPending
                  ? "Saving..."
                  : "Save Book"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </PageLayout>
  );
}
