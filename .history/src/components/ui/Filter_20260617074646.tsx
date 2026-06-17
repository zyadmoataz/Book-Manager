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
        <button className='flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition  text-slate-700 hover:bg-slate-200'>
          <FilterIcon size={14} />
        </button>
      </div>
    </div>
  );
}

export default Filter;
