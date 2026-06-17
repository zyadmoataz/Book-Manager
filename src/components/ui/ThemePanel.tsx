import { useTheme } from "@/providers/ThemeProvider";
import { Moon, Sun } from "lucide-react";

function ThemePanel() {
  const { theme, setTheme } = useTheme();

  return (
    <>
      {theme === "light" ? (
        <button
          onClick={() => setTheme("dark")}
          className='rounded-full border border-border text-foreground p-2.5 transition-all duration-200 hover:bg-muted hover:text-foreground active:bg-muted/80 hover:scale-110 active:scale-95 cursor-pointer'
        >
          <Moon size={14} />
        </button>
      ) : (
        <button
          onClick={() => setTheme("light")}
          className='rounded-full border border-border text-foreground p-2.5 transition-all duration-200 hover:bg-muted hover:text-foreground active:bg-muted/80 hover:scale-110 active:scale-95 cursor-pointer'
        >
          <Sun size={14} />
        </button>
      )}
    </>
  );
}

export default ThemePanel;
