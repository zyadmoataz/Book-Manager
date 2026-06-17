import { Book } from "@/types";
import { BookOpen, Calendar, User, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { useFavorites } from "@/hooks/useFavorites";

export default function BookCard({ book }: { book: Book }) {
  const { toggleFavorite, isFavorite } = useFavorites();
  const favorite = isFavorite(book.id);

  return (
    <div
      key={book.id}
      className='group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary-500/10'
    >
      {/* Cover Image */}
      <div className='aspect-[3/4] w-full overflow-hidden bg-slate-100 relative'>
        <img
          src={
            book.cover ||
            "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=800&auto=format&fit=crop"
          }
          alt={book.title}
          className='h-full w-full object-cover transition-transform duration-500 group-hover:scale-105'
        />
        {/* Top Right Badges */}
        <div className='absolute top-3 right-3 flex flex-col gap-2 items-end'>
          <span
            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold backdrop-blur-md ${book.read ? "bg-emerald-500/90 text-white" : "bg-amber-500/90 text-white"}`}
          >
            {book.read ? "Read" : "Unread"}
          </span>
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleFavorite(Number(book.id));
            }}
            className={`flex h-8 w-8 items-center justify-center rounded-full backdrop-blur-md transition-all cursor-pointer z-50 ${
              favorite
                ? "bg-red-500 text-white"
                : "bg-white/70 text-slate-600 hover:bg-white"
            }`}
          >
            <Heart className={`h-4 w-4 ${favorite ? "fill-current" : ""}`} />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className='flex flex-1 flex-col p-5'>
        <div className='flex items-center gap-2 mb-2 text-xs font-medium text-primary-600 uppercase tracking-wider'>
          <span>{book.genre || "Uncategorized"}</span>
        </div>

        <h3 className='mb-1 text-lg font-bold leading-tight text-slate-900 line-clamp-2'>
          {book.title}
        </h3>

        <div className='mt-auto pt-4 flex flex-col gap-2 text-sm text-slate-500'>
          <div className='flex items-center gap-2'>
            <User className='h-4 w-4 text-slate-400' />
            <span className='truncate'>{book.author}</span>
          </div>
          <div className='flex items-center gap-2'>
            <Calendar className='h-4 w-4 text-slate-400' />
            <span>{book.year}</span>
          </div>
        </div>

        <Link
          to={`/books/${book.id}`}
          className='mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-slate-50 px-4 py-2.5 text-sm font-semibold text-slate-900 ring-1 ring-inset ring-slate-200 transition-all hover:bg-primary-50 hover:text-primary-700 hover:ring-primary-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2'
        >
          <BookOpen className='h-4 w-4' />
          View Details
        </Link>
      </div>
    </div>
  );
}
