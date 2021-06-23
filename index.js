"use strict";

const {
  types: { isPromise },
} = require("util");

const NOOP = () => undefined;

module.exports = (opts = {}, closeFunctions = []) => {
  const options = Object.assign(
    {
      timeout: 2000,
    },
    opts
  );

  for (const sig of [
    "SIGINT",
    "SIGTERM",
    "uncaughtException",
    "unhandledRejection",
  ]) {
    process.once(sig, () => {
      const code = sig.match("^SIG") ? 0 : 1;
      process.stdout.write(`[${sig}] exiting with code ${code}\n`);
      if (Array.isArray(closeFunctions)) {
        for (const cb of closeFunctions) {
          try {
            if (typeof cb === "function") {
              const p = cb();
              if (isPromise(p)) p.catch(NOOP);
            }
            // eslint-disable-next-line no-empty
          } catch (_) {}
        }
      }
      setTimeout(() => {
        process.exit(code);
      }, options.timeout).unref();
    });
  }
};
