import { useTheme } from "@/hooks/useTheme";
import { Moon, Sun } from "lucide-react";

function ThemePanel() {
  const { theme, setTheme } = useTheme();

  return (
    <>
      {theme === "light" ? (
        <button
          onClick={() => setTheme("dark")}
          className='rounded-lg border border-slate-300 px-2 py-1 text-sm'
        >
          <Moon />
          <span> Dark</span>
        </button>
      ) : (
        <button
          onClick={() => setTheme("light")}
          className='rounded-lg border border-slate-300 px-2 py-1 text-sm flex'
        >
          <Sun />
          <span> Light</span>
        </button>
      )}
    </>
  );
}

export default ThemePanel;
