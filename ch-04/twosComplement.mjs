import { readFileSync } from 'fs';
import { dirname } from 'path';

const __dirname = dirname(new URL(import.meta.url).pathname);
const bytes = readFileSync(__dirname + '/twosComplement.wasm');

const val = parseInt(process.argv[2]);

const makeTwosComplement = async (value) => {
  let obj = await WebAssembly.instantiate(new Uint8Array(bytes));
  let twos_complement = obj.instance.exports.twos_complement;
  const res = twos_complement(value);
  console.log(`twos_complement(${value}) = ${res}`);
};

makeTwosComplement(val);
