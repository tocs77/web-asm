import { readFileSync } from 'fs';
import { dirname } from 'path';

const __dirname = dirname(new URL(import.meta.url).pathname);

const bytes = readFileSync(__dirname + '/AddInt.wasm');
const value_1 = parseInt(process.argv[2]);
const value_2 = parseInt(process.argv[3]);

const makeCalc = async () => {
  const obj = await WebAssembly.instantiate(new Uint8Array(bytes));
  const add_value = obj.instance.exports.AddInt(value_1, value_2);
  console.log(`${value_1} + ${value_2} = ${add_value}`);
};

makeCalc();
