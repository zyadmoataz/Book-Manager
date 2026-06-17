import { useTheme } from "@/hooks/useTheme";

function ThemePanel() {
  const { theme, setTheme } = useTheme();

  return (
    <>
      <select
        id='theme'
        value={theme}
        onChange={(e) => setTheme(e.target.value)}
        className='rounded-lg border border-slate-300 px-2 py-1 text-sm'
      >
        <option value='light'>Light</option>
        <option value='dark'>Dark</option>
      </select>
    </>
  );
}

export default ThemePanel;
