import { useBooks } from "@/api/quires/getBook.query";
import PageLayout from "@/components/layout/PageLayout";
import BookCard from "@/components/ui/BookCard";

function BooksList() {
  const { data, isLoading, error } = useBooks();

  if (data) {
    return <div className='r'>No books</div>;
  }

  if (error) {
    return (
      <div className='flex h-64 items-center justify-center'>
        Error: {error.message}
      </div>
    );
  }

  return (
    <PageLayout>
      <div className='mb-8 flex items-center justify-between'>
        <div>
          <h1 className='text-3xl font-bold tracking-tight text-slate-900'>
            Your Library
          </h1>
          <p className='mt-2 text-slate-600'>
            Browse and manage your personal book collection.
          </p>
        </div>
      </div>

      {isLoading ? (
        <div className='flex h-64 items-center justify-center'>
          <div className='h-8 w-8 animate-spin rounded-full border-4 border-primary-200 border-t-primary-600'></div>
        </div>
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
          {data?.map((book: any) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      )}
    </PageLayout>
  );
}

export default BooksList;
