import PageLayout from "@/components/layout/PageLayout";
import { BookPlus } from "lucide-react";

function AddBooks() {
  return (
    <PageLayout>
      <div className="mx-auto max-w-3xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Add a New Book</h1>
          <p className="mt-2 text-slate-600">Expand your library by adding a new book to your collection.</p>
        </div>

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 bg-slate-50/50 p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-100 text-primary-600">
                <BookPlus className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-slate-900">Book Information</h2>
                <p className="text-sm text-slate-500">Please provide the details below.</p>
              </div>
            </div>
          </div>

          <form action="" className="p-6 sm:p-8">
            <div className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2">
              {/* Title - Full width */}
              <div className="sm:col-span-2">
                <label htmlFor="title" className="block text-sm font-medium leading-6 text-slate-900">Book Title</label>
                <div className="mt-2">
                  <input type="text" id="title" placeholder="e.g. The Pragmatic Programmer" className="block w-full rounded-xl border-0 py-2.5 px-3.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6" />
                </div>
              </div>

              {/* Author */}
              <div>
                <label htmlFor="author" className="block text-sm font-medium leading-6 text-slate-900">Author</label>
                <div className="mt-2">
                  <input type="text" id="author" placeholder="e.g. Andy Hunt" className="block w-full rounded-xl border-0 py-2.5 px-3.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6" />
                </div>
              </div>

              {/* Genre */}
              <div>
                <label htmlFor="genre" className="block text-sm font-medium leading-6 text-slate-900">Genre</label>
                <div className="mt-2">
                  <select id="genre" className="block w-full rounded-xl border-0 py-2.5 px-3.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6 bg-white">
                    <option value="">Select a genre</option>
                    <option value="tech">Technology</option>
                    <option value="sci-fi">Science Fiction</option>
                    <option value="fantasy">Fantasy</option>
                    <option value="self-help">Self-Help</option>
                    <option value="fiction">Fiction</option>
                  </select>
                </div>
              </div>

              {/* Year */}
              <div>
                <label htmlFor="year" className="block text-sm font-medium leading-6 text-slate-900">Publication Year</label>
                <div className="mt-2">
                  <input type="number" id="year" placeholder="e.g. 1999" className="block w-full rounded-xl border-0 py-2.5 px-3.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6" />
                </div>
              </div>

              {/* Cover URL */}
              <div>
                <label htmlFor="cover" className="block text-sm font-medium leading-6 text-slate-900">Cover Image URL</label>
                <div className="mt-2">
                  <input type="url" id="cover" placeholder="https://..." className="block w-full rounded-xl border-0 py-2.5 px-3.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6" />
                </div>
              </div>

              {/* Read Status */}
              <div className="sm:col-span-2 flex items-center gap-3 rounded-xl border border-slate-200 p-4">
                <input type="checkbox" id="read" className="h-5 w-5 rounded border-slate-300 text-primary-600 focus:ring-primary-600" />
                <label htmlFor="read" className="text-sm font-medium text-slate-900">
                  I have already read this book
                </label>
              </div>
            </div>

            <div className="mt-8 flex items-center justify-end gap-x-4 border-t border-slate-200 pt-6">
              <button type="button" className="text-sm font-semibold leading-6 text-slate-900 hover:text-slate-700">
                Cancel
              </button>
              <button type="submit" className="rounded-xl bg-primary-600 px-8 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 transition-all active:scale-95">
                Save Book
              </button>
            </div>
          </form>
        </div>
      </div>
    </PageLayout>
  );
}

export default AddBooks;
