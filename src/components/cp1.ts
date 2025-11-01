import { ThemeContext } from "../contexts/theme";
import { Navbar } from "./navbar";

export default function Component1() {
  return ThemeContext.Provider({
    value: { background: "blue", color: "yellow" },
    children: Navbar,
  });
}
