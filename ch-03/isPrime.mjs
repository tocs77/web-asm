import { readFileSync } from 'fs';
import { dirname } from 'path';
const __dirname = dirname(new URL(import.meta.url).pathname);
const bytes = readFileSync(__dirname + '/isPrime.wasm');
const value = parseInt(process.argv[2]);

const checkPrime = async (value) => {
  const obj = await WebAssembly.instantiate(new Uint8Array(bytes));
  if (!!obj.instance.exports.is_prime(value)) {
    console.log(`${value} is prime!`);
  } else {
    console.log(`${value} is NOT prime`);
  }
};

checkPrime(value);
