import { useTheme } from "@/hooks/useTheme";

function ThemePanel() {
  const { theme, setTheme } = useTheme();

  return (
    <>
      {theme === "light" ? (
        <button
          onClick={() => setTheme("dark")}
          className='rounded-lg border border-slate-300 px-2 py-1 text-sm'
        >
          Dark
        </button>
      ) : (
        <button
          onClick={() => setTheme("light")}
          className='rounded-lg border border-slate-300 px-2 py-1 text-sm'
        >
          Light
        </button>
      )}
    </>
  );
}

export default ThemePanel;
