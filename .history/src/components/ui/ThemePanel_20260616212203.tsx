import { useTheme } from "@/hooks/useTheme";
import { Moon, Sun } from "lucide-react";

function ThemePanel() {
  const { theme, setTheme } = useTheme();

  return (
    <>
      {theme === "light" ? (
        <button
          onClick={() => setTheme("dark")}
          className='rounded-full border border-slate-300 p-2.5 transition-all duration-200 hover:bg-slate-300 hover:text-slate-900 active:bg-slate-400 hover:scale-110 active:scale-95 cursor-pointer'
        >
          <Moon size={14} />
        </button>
      ) : (
        <button
          onClick={() => setTheme("light")}
          className='rounded-full border border-slate-300 p-2.5 transition-all duration-200 hover:bg-slate-300 hover:text-slate-900 active:bg-slate-400 hover:scale-110 active:scale-95 cursor-pointer hover:text-yellow-500'
        >
          <Sun size={14} />
        </button>
      )}
    </>
  );
}

export default ThemePanel;
