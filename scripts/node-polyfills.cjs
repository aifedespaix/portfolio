// Preloaded via NODE_OPTIONS=--require to polyfill browser globals missing in Node.js.
// @vue/devtools-kit accesses localStorage at ESM module-init time (before any config body runs).
if (typeof globalThis.localStorage === 'undefined') {
  const store = {}
  globalThis.localStorage = {
    getItem: key => store[key] ?? null,
    setItem: (key, value) => { store[key] = String(value) },
    removeItem: (key) => { delete store[key] },
    clear: () => { Object.keys(store).forEach(k => delete store[k]) },
    key: i => Object.keys(store)[i] ?? null,
    get length() { return Object.keys(store).length },
  }
}
