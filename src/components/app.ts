import { ThemeContext } from "../contexts/theme";
import Component1 from "./cp1";
import Component2 from "./cp2";
import { Navbar } from "./navbar";

export default function App() {
  return ThemeContext.Provider({
    value: { background: "black", color: "white" },
    children: () => {
      return (
        "Navbar component \n" +
        Navbar() +
        "Component1 with a different context \n" +
        Component1() +
        "Component2 with same context as navbar \n" +
        Component2()
      );
    },
  });
}
