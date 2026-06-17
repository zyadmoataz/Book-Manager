import { useBooks } from "@/api/quires/getBook.query";
import { Book } from "@/types";
import { FilterIcon } from "lucide-react";
import { useSearchParams } from "react-router-dom";

//Add a filter (e.g. by genre or read/unread) held in state.
function Filter() {
  const { data } = useBooks();
  const [searchParams, setSearchParams] = useSearchParams();
  const filter = searchParams.get("filter")?.toLowerCase() || ""; // "all", "read", "unread"

  return (
    <div>
      <div className='flex gap-2'>
        <button className='cursor-pointer transition text-slate-700 hover:scale-110'>
          <FilterIcon size={14} />
        </button>
        {genres.map((genre) => (
          <button
            key={genre}
            onClick={() => handleFilter(genre)}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
              selectedGenre === genre
                ? "bg-blue-600 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {genre}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Filter;
