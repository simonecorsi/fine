const tap = require("tap");
const { validateParameters, DEFAULT_OPTS } = require("../");

tap.test("validateParameters", (t) => {
  t.throws(() => validateParameters());
  t.doesNotThrow(() => validateParameters([], DEFAULT_OPTS));
  t.end();
});
