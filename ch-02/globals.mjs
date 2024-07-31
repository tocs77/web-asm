import { readFileSync } from 'fs';
import { dirname } from 'path';

const printer = (prefix) => {
  return (value) => console.log(`${prefix}: `, value);
};

const __dirname = dirname(new URL(import.meta.url).pathname);
const bytes = readFileSync(__dirname + '/globals.wasm');
let global_test = null;
let importObject = {
  js: {
    log_i32: printer('i32'),
    log_f32: printer('f32'),
    log_f64: printer('f64'),
  },
  env: {
    import_i32: 5_000_000_000,
    import_f32: 123.0123456789,
    import_f64: 123.0123456789,
  },
};

(async () => {
  let obj = await WebAssembly.instantiate(new Uint8Array(bytes), importObject);
  ({ globaltest: global_test } = obj.instance.exports);
  global_test();
})();
