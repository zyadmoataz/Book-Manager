import { useBooks } from "@/api/quires/getBook.query";
import { Book } from "@/types";
import { FilterIcon } from "lucide-react";
import { useState } from "react";

//Add a filter (e.g. by genre or read/unread) held in state.
function Filter() {
  const { data } = useBooks();
  const filters = data?.map((book: Book) => book.genre);
  const [selectedFilter, setSelectedFilter] = useState(filters?.[0]);
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div>
      <div className='flex gap-2'>
        {showFilters && (
          <ul className='absolute top-16 z-50 bg-white shadow-lg p-2 rounded-md w-32'>
            {filters?.map((filter: string) => (
              <li
                className='cursor-pointer transition text-slate-700 hover:scale-110'
                key={filter}
                onClick={() => setSelectedFilter(filter)}
              >
                {filter}
              </li>
            ))}
          </ul>
        )}
        <button
          className='cursor-pointer transition text-slate-700 hover:scale-110'
          onClick={() => setShowFilters(!showFilters)}
        >
          <FilterIcon size={14} />
        </button>
      </div>
    </div>
  );
}

export default Filter;
