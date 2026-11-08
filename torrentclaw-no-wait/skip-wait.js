(() => {
  "use strict";

  const chunks = self.webpackChunk_N_E ||= [];
  const functionSource = Function.prototype.toString;

  function skipCountdown(factory) {
    return function (module, ...args) {
      factory.call(this, module, ...args);

      // Webpack export getters are read-only. Keep the other exports as defined.
      const exports = module.exports;
      const descriptors = Object.getOwnPropertyDescriptors(exports);
      for (const key of Object.keys(descriptors)) {
        const decide = descriptors[key].get?.();
        if (typeof decide !== "function") continue;
        const source = functionSource.call(decide);
        if (!source.includes("priorGatedActions") || !source.includes('"countdown"')) continue;

        const deliver = (...params) => {
          const result = decide(...params);
          return result === "countdown" ? "deliver" : result;
        };
        descriptors[key].get = () => deliver;
        module.exports = Object.create(Object.getPrototypeOf(exports), descriptors);
        break;
      }
    };
  }

  let foundGate = false;
  function patchChunk(chunk) {
    if (foundGate || !chunk?.[1]) return;
    const modules = chunk[1];
    for (const id of Object.keys(modules)) {
      const factory = modules[id];
      if (typeof factory !== "function") continue;
      const source = functionSource.call(factory);
      if (!source.includes("magnet_wait_v1") || !source.includes("priorGatedActions")) continue;

      modules[id] = skipCountdown(factory);
      foundGate = true;
      break;
    }
  }

  chunks.forEach(patchChunk);
  let push = chunks.push;
  Object.defineProperty(chunks, "push", {
    configurable: true,
    get() {
      // The Webpack runtime binds the previous push before replacing it.
      const delegate = push;
      return function (...entries) {
        entries.forEach(patchChunk);
        return delegate.apply(this, entries);
      };
    },
    set(next) {
      push = next;
    }
  });
})();
