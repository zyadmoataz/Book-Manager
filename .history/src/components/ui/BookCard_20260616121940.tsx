import { Book } from "@/types";

export default function BookCard({ book }: { book: Book }) {
  return (
    <div className='border-2 rounded-lg p-4 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer'>
      <div className='relative w-full h-64 rounded-lg overflow-hidden mb-4'>
        <img
          src={book.cover}
          alt={book.title}
          className='w-full h-full object-cover'
        />
      </div>
      <h3 className='text-lg font-semibold text-gray-900 dark:text-white line-clamp-2 mb-2'>
        {book.title}
      </h3>
      <p className='text-gray-600 dark:text-gray-400 text-sm mb-4'>
        By {book.author}
      </p>
    </div>
  );
}
