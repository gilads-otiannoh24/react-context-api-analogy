const contextWindow = [];

function createContext(defaultValue) {
  const context = {
    value: defaultValue,
  };

  // include the provider method
  context.Provider = function Provider({ value, children }) {
    contextWindow.push(context.value);

    // ensures the children receive the current context value always
    context.value = value;

    const result = children();

    // always ensures that the previous context
    // is restored hence preventing context leakage from child to parent
    context.value = contextWindow.pop();

    return result;
  };

  return context;
}

function useContext(context) {
  return context.value;
}

function render(element) {
  return element();
}

// theme context
const ThemeContext = createContext({
  background: "white",
  color: "black",
});

// navbar component
function Navbar() {
  const theme = useContext(ThemeContext);
  return `<div style="background-color: ${theme.background}; color: ${theme.color}; padding: 10px;">
    <h1>My Themed Navbar</h1>
  </div>`;
}

// component 1 with different context
function Component1() {
  return ThemeContext.Provider({
    value: { background: "blue", color: "yellow" },
    children: Navbar,
  });
}
// component 2 with no context change
function Component2() {
  const theme = useContext(ThemeContext);
  return `<div style="background-color: ${theme.background}; color: ${theme.color}; padding: 10px;">
    <h1>Component 2 to be similar to navbar for theme context</h1>
  </div>`;
}

// app component
function App() {
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

// render the app
const output = render(App);
console.log(output);
