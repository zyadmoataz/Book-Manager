import { useBooks } from "@/api/quires/getBook.query";
import { Book } from "@/types";
import { FilterIcon } from "lucide-react";
import { useSearchParams } from "react-router-dom";

//Add a filter (e.g. by genre or read/unread) held in state.
function Filter() {
  const { data } = useBooks();
  const [searchParams, setSearchParams] = useSearchParams();
  const filter = searchParams.get("filter")?.toLowerCase() || ""; // "all", "read", "unread"

  const handleFilter = (type: "all" | "read" | "unread") => {
    setSearchParams({ filter: type });
  };

  return (
    <div>
      <div className='flex gap-2'>
        <button
          className='cursor-pointer transition text-slate-700 hover:scale-110'
          onClick={() => handleFilter("all")}
        >
          <FilterIcon size={14} />
          All
        </button>
        <button
          className='cursor-pointer transition text-slate-700 hover:scale-110'
          onClick={() => handleFilter("read")}
        >
          <FilterIcon size={14} />
          Read
        </button>
        <button
          className='cursor-pointer transition text-slate-700 hover:scale-110'
          onClick={() => handleFilter("unread")}
        >
          <FilterIcon size={14} />
          Unread
        </button>
      </div>
    </div>
  );
}

export default Filter;
