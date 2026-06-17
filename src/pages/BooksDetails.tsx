import PageLayout from "@/components/layout/PageLayout";
import { useBookById } from "@/api/quires/getBook.query";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, BookOpen, Calendar, User, Star } from "lucide-react";
import { Tabs } from "@/components/ui/Tabs";
import { useFavorites } from "@/hooks/useFavorites";
import { useToggleReadMutation } from "@/api/quires/updateBook.mutation";

function BooksDetails() {
  const { id } = useParams();
  const { data, isLoading } = useBookById(Number(id));
  const { toggleFavorite, isFavorite } = useFavorites();
  const toggleReadMutation = useToggleReadMutation();
  
  const favorite = data ? isFavorite(Number(data.id)) : false;

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

              {data.tags && data.tags.length > 0 && (
                <div className="mb-8 flex flex-wrap gap-2">
                  {data.tags.map((tag: any) => (
                    <span key={tag.id} className="inline-flex items-center rounded-full bg-slate-100 dark:bg-slate-800 px-3 py-1 text-xs font-medium text-slate-600 dark:text-slate-300">
                      #{tag.name}
                    </span>
                  ))}
                </div>
              )}

              <div className="mb-8 max-w-none">
                <Tabs defaultValue="overview">
                  <Tabs.List className="mb-4">
                    <Tabs.Trigger value="overview">Overview</Tabs.Trigger>
                    <Tabs.Trigger value="reviews">Reviews</Tabs.Trigger>
                  </Tabs.List>
                  
                  <Tabs.Content value="overview">
                    <div className="prose prose-slate text-slate-600">
                      <p>
                        {data.overview || "No overview available for this book."}
                      </p>
                    </div>
                  </Tabs.Content>
                  
                  <Tabs.Content value="reviews">
                    {data.reviews && data.reviews.length > 0 ? (
                      <div className="space-y-4">
                        {data.reviews.map((review: string, idx: number) => (
                          <div key={idx} className="rounded-xl bg-slate-50 p-4 border border-slate-100">
                            <p className="text-slate-600 italic">"{review}"</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center text-slate-500">
                        No reviews yet. Be the first to review this book!
                      </div>
                    )}
                  </Tabs.Content>
                </Tabs>
              </div>

              <div className='mt-auto grid gap-4 sm:grid-cols-2'>
                <button 
                  onClick={() => toggleFavorite(Number(data.id))}
                  className={`flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 active:scale-95 ${
                    favorite 
                      ? "bg-slate-800 hover:bg-slate-700 dark:bg-slate-700 dark:hover:bg-slate-600" 
                      : "bg-primary-600 hover:bg-primary-500"
                  }`}
                >
                  <Star className={`h-4 w-4 ${favorite ? "fill-current text-yellow-400" : ""}`} />
                  {favorite ? "Remove from Favorites" : "Add to Favorites"}
                </button>
                <button 
                  onClick={() => toggleReadMutation.mutate({ id: Number(data.id), read: !data.read })}
                  disabled={toggleReadMutation.isPending}
                  className='flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 transition-all hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 active:scale-95 dark:bg-slate-800 dark:text-slate-100 dark:ring-slate-700 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed'
                >
                  {toggleReadMutation.isPending ? "Updating..." : data.read ? "Mark as Unread" : "Mark as Read"}
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
