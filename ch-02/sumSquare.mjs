import { readFileSync } from 'fs';
import { dirname } from 'path';
const __dirname = dirname(new URL(import.meta.url).pathname);
const bytes = readFileSync(__dirname + '/SumSquared.wasm');
const val1 = parseInt(process.argv[2]);
const val2 = parseInt(process.argv[3]);

const makeSquare = async () => {
  const obj = await WebAssembly.instantiate(new Uint8Array(bytes));
  const sum_sq = obj.instance.exports.SumSquared(val1, val2);
  console.log(`(${val1} + ${val2}) * (${val1} + ${val2}) = ${sum_sq}`);
};

makeSquare();
