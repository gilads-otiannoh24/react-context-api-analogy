import { useContext } from "../lib/context";
import { ThemeContext } from "../contexts/theme";

export function Navbar() {
  const theme = useContext(ThemeContext);

  ThemeContext.value = {
    background: "blue",
    color: "brown",
  };

  return `<div style="background-color: ${theme.background}; color: ${theme.color}; padding: 10px;">
    <h1>My Themed Navbar</h1>
  </div>`;
}
