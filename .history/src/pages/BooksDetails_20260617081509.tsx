import PageLayout from "@/components/layout/PageLayout";
import { useBookById } from "@/api/quires/getBook.query";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, BookOpen, Calendar, User, Star } from "lucide-react";

function BooksDetails() {
  const { id } = useParams();
  const { data, isLoading } = useBookById(Number(id));

  return (
    <PageLayout>
      <div className='mb-6'>
        <Link
          to='/'
          className='inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition-colors hover:text-slate-900'
        >
          <ArrowLeft className='h-4 w-4' />
          Back to Library
        </Link>
      </div>

      {isLoading ? (
        <div className='flex h-64 items-center justify-center'>
          <div className='h-8 w-8 animate-spin rounded-full border-4 border-primary-200 border-t-primary-600'></div>
        </div>
      ) : !data ? (
        <div className='flex flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white p-12 text-center shadow-sm'>
          <BookOpen className='mb-4 h-12 w-12 text-slate-300' />
          <h2 className='text-xl font-bold text-slate-900'>Book not found</h2>
          <p className='mt-2 text-slate-500'>
            The book you're looking for doesn't exist or has been removed.
          </p>
        </div>
      ) : (
        <div className='overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-200/40'>
          <div className='grid md:grid-cols-2 lg:grid-cols-5'>
            {/* Left Column - Image */}
            <div className='relative bg-slate-100 lg:col-span-2'>
              <img
                src={
                  data.cover ||
                  "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=800&auto=format&fit=crop"
                }
                alt={data.title}
                className='h-full w-full object-cover md:absolute md:inset-0'
              />
              <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent md:hidden'></div>
            </div>

            {/* Right Column - Details */}
            <div className='flex flex-col p-8 md:p-10 lg:col-span-3'>
              <div className='mb-4 flex items-center gap-3'>
                <span className='inline-flex items-center rounded-full bg-primary-50 px-3 py-1 text-sm font-semibold text-primary-700 ring-1 ring-inset ring-primary-600/20'>
                  {data.genre || "Uncategorized"}
                </span>
                <span
                  className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-semibold ${data.read ? "bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-600/20" : "bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-600/20"}`}
                >
                  {data.read ? "Read" : "Unread"}
                </span>
              </div>

              <h1 className='mb-2 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl'>
                {data.title}
              </h1>

              <div className='mb-8 flex flex-wrap gap-x-6 gap-y-3 text-slate-600'>
                <div className='flex items-center gap-2'>
                  <User className='h-5 w-5 text-slate-400' />
                  <span className='font-medium text-slate-900'>
                    {data.author}
                  </span>
                </div>
                <div className='flex items-center gap-2'>
                  <Calendar className='h-5 w-5 text-slate-400' />
                  <span>{data.year}</span>
                </div>
              </div>

              <div className='prose prose-slate mb-8 max-w-none text-slate-600'>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </p>
                <p>
                  Duis aute irure dolor in reprehenderit in voluptate velit esse
                  cillum dolore eu fugiat nulla pariatur. Excepteur sint
                  occaecat cupidatat non proident, sunt in culpa qui officia
                  deserunt mollit anim id est laborum.
                </p>
              </div>

              <div className='mt-auto grid gap-4 sm:grid-cols-2'>
                <button className='flex items-center justify-center gap-2 rounded-xl bg-primary-600 px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 active:scale-95'>
                  <Star className='h-4 w-4' />
                  Add to Favorites
                </button>
                <button className='flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 transition-all hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 active:scale-95'>
                  {data.read ? "Mark as Unread" : "Mark as Read"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </PageLayout>
  );
}

export default BooksDetails;
