import { useTheme } from "@/hooks/useTheme";

function ThemePanel() {
  const { theme, setTheme } = useTheme();

  return (
    <>
      <label htmlFor='theme'>Theme:</label>
      <select
        id='theme'
        value={theme}
        onChange={(e) => setTheme(e.target.value)}
      >
        <option value='light'>Light</option>
        <option value='dark'>Dark</option>
      </select>
    </>
  );
}

export default ThemePanel;
