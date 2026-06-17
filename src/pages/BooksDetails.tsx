import { useBookById } from "@/api/queries/getBook.query";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, BookOpen, Calendar, User, Heart } from "lucide-react";
import { Tabs } from "@/components/ui/Tabs";
import { useFavorites } from "@/providers/FavoritesProvider";
import { useToggleReadMutation } from "@/api/queries/updateBook.mutation";

function BooksDetails() {
  const { id } = useParams();
  const { data, isLoading, error } = useBookById(Number(id));
  const { toggleFavorite, isFavorite } = useFavorites();
  const toggleReadMutation = useToggleReadMutation();
  
  const favorite = data ? isFavorite(Number(data.id)) : false;

  if (isLoading) {
    return (
      <div className='flex h-[50vh] items-center justify-center'>
        <div className='h-8 w-8 animate-spin rounded-full border-4 border-primary-200 border-t-primary-600'></div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className='flex h-[50vh] items-center justify-center text-foreground'>
        <div className='text-center'>
          <h2 className='mb-2 text-2xl font-bold'>
            Book not found
          </h2>
          <p className='text-muted-foreground'>
            {error?.message || "The book you're looking for doesn't exist."}
          </p>
          <Link
            to='/'
            className='mt-6 inline-block rounded-xl bg-primary-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-500'
          >
            Back to Library
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className='mx-auto max-w-4xl'>
        <Link
          to='/'
          className='mb-8 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground'
        >
          <ArrowLeft className='h-4 w-4' />
          Back to Library
        </Link>

        <div className='overflow-hidden rounded-3xl bg-surface shadow-xl shadow-border/50 ring-1 ring-border/20 transition-colors duration-300'>
          <div className='flex flex-col md:flex-row'>
            {/* Left side - Cover image */}
            <div className='relative md:w-2/5 lg:w-1/3 shrink-0'>
              <div className='absolute inset-0 bg-muted animate-pulse' />
              <img
                src={data.cover}
                alt={`Cover of ${data.title}`}
                className='relative h-[400px] w-full object-cover md:h-full md:min-h-[500px]'
                onLoad={(e) => {
                  e.currentTarget.previousElementSibling?.remove();
                }}
              />
              <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 md:bg-gradient-to-r' />
            </div>

            {/* Right side - Content */}
            <div className='flex flex-col p-8 md:p-10 lg:p-12 w-full'>
              <div className='mb-4 flex items-start justify-between gap-4'>
                <h1 className='text-3xl font-bold tracking-tight text-foreground sm:text-4xl'>
                  {data.title}
                </h1>
                <span className='inline-flex shrink-0 items-center rounded-full bg-primary-50 dark:bg-primary-900/50 px-3 py-1 text-xs font-semibold text-primary-700 dark:text-primary-400 ring-1 ring-inset ring-primary-600/20'>
                  {data.genre}
                </span>
              </div>

              <div className='mb-8 flex flex-wrap gap-x-6 gap-y-3 text-muted-foreground'>
                <div className='flex items-center gap-2'>
                  <User className='h-5 w-5 opacity-70' />
                  <span className='font-medium text-foreground'>
                    {data.author}
                  </span>
                </div>
                <div className='flex items-center gap-2'>
                  <Calendar className='h-5 w-5 opacity-70' />
                  <span>{data.year}</span>
                </div>
              </div>

              {data.tags && data.tags.length > 0 && (
                <div className="mb-8 flex flex-wrap gap-2">
                  {data.tags.map((tag: any) => (
                    <span key={tag.id} className="inline-flex items-center rounded-full bg-muted px-3 py-1 text-xs font-medium text-foreground">
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
                    <div className="prose prose-slate dark:prose-invert">
                      <p className='text-lg leading-relaxed text-muted-foreground'>
                        {data.overview ||
                          "A comprehensive guide to modern development practices, focusing on maintainability and delivering value to users."}
                      </p>
                    </div>
                  </Tabs.Content>
                  
                  <Tabs.Content value="reviews">
                    <div className="space-y-4">
                      {data.reviews && data.reviews.length > 0 ? (
                        data.reviews.map((review: string, idx: number) => (
                          <div key={idx} className="rounded-xl bg-muted/50 p-4 border border-border">
                            <p className="italic text-muted-foreground">"{review}"</p>
                          </div>
                        ))
                      ) : (
                        <p className="text-muted-foreground italic">No reviews yet.</p>
                      )}
                    </div>
                  </Tabs.Content>
                </Tabs>
              </div>

              <div className='mt-auto flex flex-wrap items-center gap-4 border-t border-border pt-8'>
                <button
                  onClick={() =>
                    toggleReadMutation.mutate({ id: Number(data.id), read: !data.read })
                  }
                  className={`flex flex-1 items-center justify-center gap-2 rounded-xl px-8 py-3.5 text-sm font-semibold transition-all active:scale-95 ${
                    data.read
                      ? "bg-muted text-foreground hover:opacity-80"
                      : "bg-primary-600 text-white shadow-md hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
                  }`}
                  disabled={toggleReadMutation.isPending}
                >
                  <BookOpen className='h-5 w-5' />
                  {toggleReadMutation.isPending ? "Updating..." : data.read ? "Mark as Unread" : "Mark as Read"}
                </button>
                <button
                  onClick={() => toggleFavorite(Number(data.id))}
                  className={`flex h-12 w-12 items-center justify-center rounded-xl border transition-all active:scale-95 ${
                    favorite
                      ? "border-red-200 bg-red-50 text-red-500 dark:border-red-900/50 dark:bg-red-900/20 dark:text-red-400"
                      : "border-border bg-surface text-muted-foreground hover:bg-muted"
                  }`}
                >
                  <Heart
                    className={`h-5 w-5 ${favorite ? "fill-current" : ""}`}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BooksDetails;
