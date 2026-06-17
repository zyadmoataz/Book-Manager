import { useTheme } from "@/hooks/useTheme";
import { Moon, Sun } from "lucide-react";

function ThemePanel() {
  const { theme, setTheme } = useTheme();

  return (
    <>
      {theme === "light" ? (
        <button
          onClick={() => setTheme("dark")}
          className='flex items-center gap-2 rounded-lg border border-slate-300 px-2 py-1 text-sm'
        >
          <Moon />
          <span> Dark</span>
        </button>
      ) : (
        <button
          onClick={() => setTheme("light")}
          className='rounded-full border border-slate-300 px-3 py-3 '
        >
          <Sun size={14} />
        </button>
      )}
    </>
  );
}

export default ThemePanel;
