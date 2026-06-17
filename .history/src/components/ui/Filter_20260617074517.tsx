import { useBooks } from "@/api/quires/getBook.query";
import { Book } from "@/types";
import { useSearchParams } from "react-router-dom";

function Filter() {
  const { data } = useBooks();
  const [searchParams, setSearchParams] = useSearchParams();
  const filter = searchParams.get("filter")?.toLowerCase() || ""; // "all", "read", "unread"

  const toggleFilter = (type: "all" | "read" | "unread") => {
    if (filter === type) {
      setSearchParams({}); // Remove filter if same one clicked again
    } else {
      setSearchParams({ filter: type });
    }
  };

  const getFilterClassName = (type: "all" | "read" | "unread") => {
    const isActive = filter === type;
    return isActive
      ? "bg-primary-600 text-white"
      : "bg-slate-100 text-slate-700 hover:bg-slate-200";
  };

  return (
    <div>
      <div className='flex gap-2'></div>
    </div>
  );
}

export default Filter;
