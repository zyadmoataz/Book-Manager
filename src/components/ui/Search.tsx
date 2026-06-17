import { Search as SearchIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { useSearchParams } from "react-router-dom";

function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  
  // 1. Initialize our input with whatever is in the URL (if anything)
  const [search, setSearch] = useState(searchParams.get("searchQuery") || "");
  const debouncedSearch = useDebounce(search, 500);

  // 2. Whenever the debounced search changes, update the URL!
  useEffect(() => {
    if (debouncedSearch) {
      setSearchParams({ searchQuery: debouncedSearch });
    } else {
      setSearchParams({}); // Clear the URL if search is empty
    }
  }, [debouncedSearch, setSearchParams]);

  return (
    <div>
      <div className='relative'>
        <SearchIcon className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 ' />
        <input
          className='w-full rounded-lg border border-slate-300 p-2.5 pl-9 border'
          type='text'
          placeholder='Search...'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
    </div>
  );
}

export default Search;
