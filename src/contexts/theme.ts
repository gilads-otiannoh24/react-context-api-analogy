import { createContext } from "../lib/context";

export const ThemeContext = createContext<{
  background: string;
  color: string;
}>({
  background: "white",
  color: "black",
});
