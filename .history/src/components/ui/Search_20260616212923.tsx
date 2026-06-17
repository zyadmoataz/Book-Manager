import { Search as SearchIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";

function Search() {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);
  useEffect(() => {
    if (debouncedSearch) {
      console.log(debouncedSearch);
    }
  }, [debouncedSearch]);
  return (
    <div>
      <div className='relative'>
        <SearchIcon className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 ' />
        <input
          className='w-full rounded-lg border border-slate-300 p-2.5 pl-9 border border-slate-300'
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
