# Mini React Context — A Tiny Context API Clone in Pure JavaScript

![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)

This project is a lightweight re-implementation of React’s **Context API** — built entirely from scratch in under 60 lines of JavaScript.

It demonstrates how React internally manages context values, restores them during nested renders, and lets child components access the correct values through a simple `useContext()` hook.

---

## 🚀 Features

✅ `createContext(defaultValue)` — create a new context object  
✅ `context.Provider` — temporarily override the current value for children  
✅ `useContext(context)` — read the current context value anywhere in the tree  
✅ Stack-based context restoration — just like React’s internal mechanism  
✅ Simple `render()` function to evaluate the “component tree”

---

## Run app

Clone the repo aand then run it using node or any ohter js runtime

```bash
node index.js
```

## 💡 Improvements & Ideas to Try

One of the best things about small experimental projects like this is how easily you can tinker, extend, and break things just to see _why_ they work.  
Here are a few directions you can explore:

### 🧩 1. Support Multiple Contexts

Right now, `contextWindow` is global — meaning only one context is properly tracked.  
You could store a **separate stack per context**, like:

```js
const contextStacks = new WeakMap();
```

Then each context manages its own push/pop operations independently — just like React does internally.

---

### 🔁 2. Add a Consumer Component

Mimic React’s `<Context.Consumer>` syntax:

```js
ThemeContext.Consumer({
  children: (value) => `<p>Theme color is ${value.color}</p>`,
});
```

This would let you use contexts without directly calling `useContext()`.

---

### ⚡ 3. Add Basic Reactivity

Right now, context values are static — once rendered, they don’t trigger re-renders.
You could:

- Keep track of components that used a context
- When the context value changes, re-render those components

That would move it closer to how **React schedules updates** on context changes.

---

### 🌳 4. Simulate a Component Tree

Instead of manually calling components, build a simple “virtual tree” structure:

```js
function App() {
  return createElement(
    ThemeContext.Provider,
    { value: theme },
    createElement(Navbar),
    createElement(Footer)
  );
}
```

Then write a small recursive renderer that walks the tree — you’ll be halfway to writing your own **mini React reconciler**.

---

### 🧠 5. Add DevTools Logging

Insert logs at each stack push/pop:

```js
console.log("Entering Provider:", context.value);
console.log("Leaving Provider:", context.value);
```

This gives you a beautiful, visible trace of context scoping in action.

---

### 🧬 6. Try Nesting Contexts

Add a second context (e.g. `UserContext`) and nest providers:

```js
ThemeContext.Provider({
  value: theme,
  children: () =>
    UserContext.Provider({
      value: user,
      children: Navbar,
    }),
});
```

Watch how each `useContext()` pulls the correct value depending on scope — it’s a great way to see **stack-based scoping** in action.

---

### 🧩 7. Experiment With Real DOM Output

Instead of returning strings, try using the DOM:

```js
document.body.innerHTML = render(App);
```

Or even create a mini “mount” function that injects the rendered HTML directly — tiny step toward a UI runtime.

---

### 💭 8. Document What You Learn

As you explore, add notes or diagrams in your README.
Projects like this make excellent blog posts or portfolio pieces — they show you understand _why_ React works, not just _how to use it_.

---

## ✨ Final Thought

The best way to understand frameworks like React is to _rebuild them in miniature_.
Each improvement brings you closer to understanding how React’s Fiber, context propagation, and hooks all fit together — but without the abstraction overhead.
