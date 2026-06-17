import { useTheme } from "@/hooks/useTheme";

function ThemePanel() {
  const { theme, setTheme } = useTheme();

  return (
    <>
      <p>Theme: {theme}</p>
      <button onClick={() => setTheme("light")}>Light</button>
      <button onClick={() => setTheme("dark")}>Dark</button>
    </>
  );
}

export default ThemePanel;
