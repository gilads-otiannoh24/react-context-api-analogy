export interface Context {
  value: any;
  Provider: ({ value, children }: { value: any; children: () => any }) => any;
  Consumer: ({ children }: { children: Function }) => any;
}

const contextWindow = new WeakMap();

export function createContext(defaultValue: any): Context {
  const context: Context = {
    value: defaultValue,
    Provider({ value, children }) {},
    Consumer({ children }) {},
  };

  contextWindow.set(context, []);

  // include the provider method
  context.Provider = function Provider({ value, children }) {
    const stack = contextWindow.get(context);
    stack.push(context.value);

    // ensures the children receive the current context value always
    context.value = value;

    const result = children();

    // always ensures that the previous context
    // is restored hence preventing context leakage from child to parent
    context.value = stack.pop();

    return result;
  };

  context.Consumer = function Consumer({ children }) {
    return children(context.value);
  };

  return context;
}

export function useContext(context: Context) {
  return context.value;
}
