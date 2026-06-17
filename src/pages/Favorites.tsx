import PageLayout from "@/components/layout/PageLayout";
import { HeartCrack } from "lucide-react";
import { Link } from "react-router-dom";

function Favorites() {
  // Currently an empty state, you can populate this with real data later
  const hasFavorites = false;

  return (
    <PageLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Your Favorites</h1>
        <p className="mt-2 text-slate-600">The books that hold a special place on your shelf.</p>
      </div>

      {!hasFavorites ? (
        <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-white/50 px-6 py-20 text-center">
          <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-slate-100">
            <HeartCrack className="h-10 w-10 text-slate-400" />
          </div>
          <h2 className="mb-2 text-xl font-bold text-slate-900">No favorites yet</h2>
          <p className="mb-8 max-w-sm text-slate-500">
            You haven't added any books to your favorites list. Explore your library and save the ones you love!
          </p>
          <Link
            to="/"
            className="rounded-xl bg-primary-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 active:scale-95"
          >
            Explore Library
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {/* Render favorite books here */}
        </div>
      )}
    </PageLayout>
  );
}

export default Favorites;
