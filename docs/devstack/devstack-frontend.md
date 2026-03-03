# Frontend Runtime

The frontend layer is what actually runs in your browser. Everything else in this stack exists to get `index.html` to the user — this layer is what happens once it arrives.

---

## The Browser as a Runtime Environment

A runtime environment is where code executes. Node.js is a runtime for JavaScript on a server. The browser is a runtime for JavaScript on the client — with its own set of capabilities, its own APIs, and its own constraints that are fundamentally different from any server environment.

The browser gives your JavaScript access to:

- **The DOM** — the rendered page, which your code can read and modify
- **fetch** — network requests (HTTP calls to APIs)
- **Web Crypto API** — cryptographic operations (the AES/PBKDF2 encryption in Crosstalk)
- **Storage APIs** — localStorage, sessionStorage, IndexedDB
- **Browser APIs** — geolocation, clipboard, notifications, file access (with restrictions)

What the browser deliberately withholds:

- **Filesystem access** — JavaScript can't read or write arbitrary files on your machine (the file picker API is tightly controlled)
- **Network sockets** — you can't open raw TCP connections; everything goes through HTTP via fetch
- **OS APIs** — no process management, no system calls

These restrictions are what make browsers safe to use for arbitrary web content. They're also what makes the browser an unusual environment compared to server-side runtimes — the entire architecture of Crosstalk is shaped by navigating these constraints.

---

## HTML, CSS, JavaScript

These three languages are the foundational substrate of every browser application.

**HTML** (HyperText Markup Language) defines structure. It's a document format that describes content hierarchically: this is a heading, this is a paragraph, this is a button. In Crosstalk's `index.html`, the HTML is minimal — a `<div id="root">` where React mounts itself, plus `<script>` tags that load the libraries.

**CSS** (Cascading Style Sheets) defines presentation. It describes how elements look — colors, typography, spacing, layout. "Cascading" refers to how rules inherit and override each other based on specificity. Crosstalk's CSS lives in a `<style>` block in the same file, using CSS custom properties (variables) like `--bg-primary` and `--claude-accent` to maintain a consistent visual system across all components.

**JavaScript** defines behavior. It's the language that makes pages interactive — responding to events, calling APIs, updating the DOM. Everything in Crosstalk that isn't markup or styling is JavaScript.

---

## React

React is a JavaScript library for building user interfaces. It was developed by Facebook and is currently the most widely-used frontend library.

### The core idea: declarative UI

Traditional ("imperative") DOM manipulation looks like this: "find the element with id `response-text`, then set its innerHTML to this value, then add a class to make it visible, then remove the loading spinner." Every step is explicit.

React is declarative: you describe what the UI should look like given the current state, and React figures out the minimal DOM changes needed to get there. Your code says "if `isLoading` is true, show the spinner; if `response` has text, show the text." React handles the actual DOM updates.

This becomes powerful at scale — complex UIs with many interdependent states are much easier to reason about declaratively. It's why React (and similar libraries like Vue and Svelte) have become standard.

### Components

A React component is a function that returns a description of what to render. Crosstalk's UI is built from components: `App`, `ModelCard`, `SettingsPanel`, `HistoryPanel`. Each manages its own logic and renders its piece of the interface.

```jsx
function ModelCard({ model, response, isLoading }) {
  return (
    <div className="card">
      {isLoading && <span>Thinking...</span>}
      {response && <p>{response}</p>}
    </div>
  );
}
```

The `{}` syntax inside the markup is JSX — JavaScript expressions embedded in what looks like HTML. This isn't actually HTML; it's a syntax that React transforms into function calls that describe DOM elements.

### State and hooks

**State** is data that, when it changes, causes the component to re-render. In React, state is managed with the `useState` hook:

```javascript
const [prompt, setPrompt] = useState('');
```

`prompt` is the current value. `setPrompt` is the function that updates it. Every call to `setPrompt` triggers a re-render of any component that uses `prompt`.

**Hooks** are functions that let components tap into React features. The ones in Crosstalk:

- `useState` — local state management
- `useEffect` — run side effects after render (the textarea auto-resize)
- `useRef` — a mutable reference that doesn't trigger re-renders (the textarea DOM reference)
- `useCallback` — memoize a function so it doesn't get recreated on every render

---

## The Single-File Architecture

Crosstalk's `index.html` is unusual — most React applications use a build system. Here's what's different and why it matters.

### The typical React setup

Most React projects use a build tool like Vite or webpack. You write components in `.jsx` files, import them from each other, use npm packages, and run a build command that compiles everything into optimized JavaScript files the browser can run. The output is a `dist/` folder with minified files.

### What Crosstalk does instead

Everything lives in one file. React, ReactDOM, and Babel are loaded from CDN URLs at runtime. JSX is compiled in the browser by Babel at page load rather than ahead of time.

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/react/18.2.0/umd/react.production.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/7.23.9/babel.min.js"></script>
<script type="text/babel">
  // JSX compiled in the browser
  function App() { return <div>Hello</div>; }
</script>
```

### Why this was the right choice for now

**Portability** — the file runs by opening it in a browser or dropping it on a static host. No Node.js, no npm, no build step. This was essential during the period when you were iterating quickly on the prototype and needed zero deployment friction.

**Simplicity** — no toolchain to configure, no dependencies to manage, no build errors to debug. The cognitive overhead of the build system is deferred entirely.

### The tradeoffs

**Runtime compilation is slow** — Babel compiles the JSX in the browser on every page load. For a large app this would be noticeably slow. For Crosstalk's current size it's acceptable but will eventually become a reason to migrate to a build setup.

**No tree shaking** — the UMD bundles loaded from CDN include all of React, even code you don't use. A build tool would strip unused code.

**CDN dependency** — if the CDN is unavailable, the app doesn't load. Hosting dependencies locally or using a build tool eliminates this.

**No npm ecosystem** — you can only use libraries available as CDN-loadable UMD bundles. Most are, but not all.

When Crosstalk eventually migrates to a build setup (Vite is the current standard), the JSX code itself doesn't need to change significantly — just the loading mechanism. The migration is straightforward but has a real toolchain setup cost.

---

## What Happens When the Page Loads

The sequence every time `index.html` is requested:

1. Browser receives the HTML from Cloudflare Pages
2. Browser parses the HTML, begins loading scripts
3. React and ReactDOM load from CDN
4. Babel loads from CDN
5. Babel compiles the JSX in the `<script type="text/babel">` block
6. `ReactDOM.createRoot(document.getElementById('root')).render(<App />)` executes
7. React renders the initial UI — the empty state with the Settings button
8. `renderFileList()` in the devstack reader populates the sidebar

From the user's perspective this happens in 1–3 seconds depending on network speed. The CDN loading is the bottleneck.

---

## Summary

| Concept | What it means in practice |
|---------|--------------------------|
| Browser runtime | Sandboxed JavaScript environment with DOM, fetch, crypto, storage APIs |
| DOM | The live representation of the page that JavaScript can read and modify |
| HTML | Document structure |
| CSS | Presentation — how elements look |
| JavaScript | Behavior — interactivity and logic |
| React | Declarative UI library — describe what to render given state |
| Component | A function that returns a description of what to render |
| JSX | JavaScript syntax for describing UI — looks like HTML, compiles to function calls |
| State | Data that triggers re-renders when it changes |
| Hook | React function that provides access to state, effects, refs, etc. |
| Build tool | Compiles, bundles, and optimizes source files for deployment (Vite, webpack) |
| UMD bundle | Pre-compiled library format loadable directly from a CDN without a build step |
| Single-file architecture | Everything in one HTML file — portable but not scalable |
