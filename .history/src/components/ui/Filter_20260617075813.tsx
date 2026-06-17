import { useBooks } from "@/api/quires/getBook.query";
import { Book } from "@/types";
import { FilterIcon } from "lucide-react";
import { useReducer, useState } from "react";

interface FilterState {
  read: boolean;
  genre: string;
}

interface FilterAction {
  type: string;
  payload: FilterState;
}

// 1. Define the initial state for reducer
const initialTasks: FilterState = { read: false, genre: "" };

// 2. Define the reducer function
function tasksReducer(state: FilterState, action: FilterAction): FilterState {
  switch (action.type) {
    case "SET_READ":
      return { ...state, read: action.payload.read };
    case "SET_GENRE":
      return { ...state, genre: action.payload.genre };
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}

//Add a filter (e.g. by genre or read/unread) held in state.
function Filter() {
  const { data } = useBooks();
  const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);

  const [showFilters, setShowFilters] = useState(false);
  const filters = [...new Set([...data?.map((book: Book) => book.read)])];

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
