import { useBooks } from "@/api/quires/getBook.query";
import { Book } from "@/types";
import { FilterIcon } from "lucide-react";
import { useEffect, useReducer, useState } from "react";
import { useSearchParams } from "react-router-dom";

type ReadFilter = "all" | "read" | "unread";

type FilterAction =
  | { type: "SET_READ"; payload: ReadFilter }
  | { type: "SET_GENRE"; payload: string }
  | { type: "RESET" };

interface FilterState {
  read: ReadFilter;
  genre: string;
}

// 1. Define the reducer function
function filterReducer(state: FilterState, action: FilterAction): FilterState {
  switch (action.type) {
    case "SET_READ":
      return { ...state, read: action.payload };
    case "SET_GENRE":
      return { ...state, genre: action.payload };
    case "RESET":
      return { read: "all", genre: "all" };
    default:
      return state;
  }
}

function Filter() {
  const { data } = useBooks();
  const [searchParams, setSearchParams] = useSearchParams();

  // 2. Initialize the reducer state directly from the URL params!
  const [state, dispatch] = useReducer(filterReducer, {
    read: (searchParams.get("read") as ReadFilter) || "all",
    genre: searchParams.get("genre") || "all",
  });

  // 3. Whenever our reducer state changes, push it back to the URL
  // so that BooksList can read the params and actually filter the list!
  useEffect(() => {
    const newParams = new URLSearchParams(searchParams);

    if (state.read === "all") newParams.delete("read");
    else newParams.set("read", state.read);

    if (state.genre === "all") newParams.delete("genre");
    else newParams.set("genre", state.genre);

    setSearchParams(newParams);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.read, state.genre, setSearchParams]);

  const [showFilters, setShowFilters] = useState(false);

  // Extract unique genres from our books data dynamically
  const genres = [
    "all",
    ...new Set(data?.map((b: Book) => b.genre).filter(Boolean)),
  ];

  return (
    <div className='relative'>
      <button
        onClick={() => setShowFilters(!showFilters)}
        className='flex items-center justify-center rounded-lg border border-slate-300 p-2.5 text-slate-700 hover:bg-slate-100 transition-colors'
      >
        <FilterIcon size={18} />
      </button>

      {showFilters && (
        <div className='absolute right-0 top-12 z-50 w-64 rounded-xl border border-slate-200 bg-white p-5 shadow-xl'>
          <div className='mb-5'>
            <h3 className='mb-3 text-sm font-semibold text-slate-900'>
              Read Status
            </h3>
            <div className='flex flex-col gap-2.5'>
              <label className='flex items-center gap-2 cursor-pointer text-sm text-slate-700'>
                <input
                  type='radio'
                  className='text-primary-600 focus:ring-primary-600 cursor-pointer'
                  checked={state.read === "all"}
                  onChange={() =>
                    dispatch({ type: "SET_READ", payload: "all" })
                  }
                />
                All Books
              </label>
              <label className='flex items-center gap-2 cursor-pointer text-sm text-slate-700'>
                <input
                  type='radio'
                  className='text-primary-600 focus:ring-primary-600 cursor-pointer'
                  checked={state.read === "read"}
                  onChange={() =>
                    dispatch({ type: "SET_READ", payload: "read" })
                  }
                />
                Read
              </label>
              <label className='flex items-center gap-2 cursor-pointer text-sm text-slate-700'>
                <input
                  type='radio'
                  className='text-primary-600 focus:ring-primary-600 cursor-pointer'
                  checked={state.read === "unread"}
                  onChange={() =>
                    dispatch({ type: "SET_READ", payload: "unread" })
                  }
                />
                Unread
              </label>
            </div>
          </div>

          <div>
            <h3 className='mb-3 text-sm font-semibold text-slate-900'>Genre</h3>
            <select
              value={state.genre}
              onChange={(e) =>
                dispatch({ type: "SET_GENRE", payload: e.target.value })
              }
              className='w-full cursor-pointer rounded-lg border border-slate-300 bg-slate-50 p-2.5 text-sm outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500'
            >
              {genres.map((g) => (
                <option key={g as string} value={g as string}>
                  {g === "all"
                    ? "All Genres"
                    : (g as string).charAt(0).toUpperCase() +
                      (g as string).slice(1)}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={() => dispatch({ type: "RESET" })}
            className='mt-6 w-full rounded-lg bg-slate-100 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-200 transition-colors'
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
}

export default Filter;
