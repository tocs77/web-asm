import { readFileSync } from 'fs';
import { dirname } from 'path';
const __dirname = dirname(new URL(import.meta.url).pathname);
const export_bytes = readFileSync(__dirname + '/tableExport.wasm');
const test_bytes = readFileSync(__dirname + '/tableTest.wasm');
let i = 0;
let increment = () => {
  i++;
  return i;
};
let decrement = () => {
  i--;
  return i;
};

const importObject = {
  js: {
    tbl: null, // tbl is initially null and is set for the second WASM module
    increment: increment, // JavaScript increment function
    decrement: decrement, // JavaScript decrement function
    wasm_increment: null, // Initially null, set to function by second module
    wasm_decrement: null, // Initially null, set to function by second module
  },
};

const testTables = async () => {
  // instantiate the module that uses a function table
  let table_exp_obj = await WebAssembly.instantiate(new Uint8Array(export_bytes), importObject);
  // set the tbl variable to the exported table
  importObject.js.tbl = table_exp_obj.instance.exports.tbl;
  importObject.js.wasm_increment = table_exp_obj.instance.exports.increment;
  importObject.js.wasm_decrement = table_exp_obj.instance.exports.decrement;
  let obj = await WebAssembly.instantiate(new Uint8Array(test_bytes), importObject);

  // use destructuring syntax to create JS functions from exports
  const { js_table_test, js_import_test, wasm_table_test, wasm_import_test } = obj.instance.exports;
  i = 0; // i variable must be reinitialized to 0
  let start = performance.now(); // get starting timestamp
  js_table_test(); // run function that tests JS table calls
  let time = performance.now() - start; // find out how much time it took to run
  console.log('js_table_test time=' + time);
  i = 0; // i must be reinitialized to 0
  start = performance.now(); // get starting timestamp
  js_import_test(); // run function that tests JS direct import calls
  time = performance.now() - start;
  console.log('js_import_test time=' + time);
  i = 0; // i must be reinitialized to 0
  start = performance.now(); // get starting timestamp
  wasm_table_test(); // run function that tests WASM table calls
  time = performance.now() - start; // find out how much time it took to run
  console.log('wasm_table_test time=' + time);
  i = 0; // i must be reinitialized to 0
  start = performance.now(); // get starting timestamp
  wasm_import_test(); // run function that tests WASM direct import calls
  time = performance.now() - start; // find out how much time it took to run
  console.log('wasm_import_test time=' + time);
};

testTables();
