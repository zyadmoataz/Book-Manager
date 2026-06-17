import { useBooks } from "@/api/quires/getBook.query";
import PageLayout from "@/components/layout/PageLayout";
import BookCard from "@/components/ui/BookCard";
import { Book } from "@/types";
import { Link, useSearchParams } from "react-router-dom";

function BooksList() {
  const { data, isLoading, error } = useBooks();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("searchQuery")?.toLowerCase() || "";
  const readFilter = searchParams.get("read") || "all";
  const genreFilter = searchParams.get("genre") || "all";

  const filteredData = data?.filter((book: Book) => {
    // 1. Text Search
    const matchesSearch = book.title.toLowerCase().includes(searchQuery) || 
                          book.author.toLowerCase().includes(searchQuery);
    
    // 2. Read Status Filter
    const matchesRead = readFilter === "all" || 
                       (readFilter === "read" && book.read) || 
                       (readFilter === "unread" && !book.read);
                       
    // 3. Genre Filter
    const matchesGenre = genreFilter === "all" || book.genre === genreFilter;

    // Must pass ALL filters to be displayed
    return matchesSearch && matchesRead && matchesGenre;
  });

  if (data?.length === 0) {
    return (
      <PageLayout>
        <div className='flex h-64 flex-col items-center justify-center gap-4'>
          <span>No books found, You can add some books!</span>
          <Link
            className='text-primary-600 font-medium underline'
            to='/add-book'
          >
            Add Book
          </Link>
        </div>
      </PageLayout>
    );
  }

  if (error) {
    return (
      <PageLayout>
        <div className='flex h-64 items-center justify-center'>
          Error: {error.message}
        </div>
      </PageLayout>
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
          {filteredData?.length === 0 ? (
            <div className="col-span-full py-12 text-center text-slate-500">
              No books found matching "{searchQuery}"
            </div>
          ) : (
            filteredData?.map((book: Book) => (
              <BookCard key={book.id} book={book} />
            ))
          )}
        </div>
      )}
    </PageLayout>
  );
}

export default BooksList;
