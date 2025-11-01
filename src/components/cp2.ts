import { useContext } from "../lib/context";
import { ThemeContext } from "../contexts/theme";

export default function Component2() {
  const theme = useContext(ThemeContext);
  return `<div style="background-color: ${theme.background}; color: ${theme.color}; padding: 10px;">
    <h1>Component 2 to be similar to navbar for theme context</h1>
  </div>`;
}
