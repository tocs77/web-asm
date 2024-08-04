import { readFileSync } from 'fs';
import { dirname } from 'path';

const __dirname = dirname(new URL(import.meta.url).pathname);
const bytes = readFileSync(__dirname + '/storeData.wasm');
// allocate a 64K block of memory
const memory = new WebAssembly.Memory({ initial: 1 });
// 32-bit data view of the memory buffer
const mem_i32 = new Uint32Array(memory.buffer);
const data_addr = 32; // the address of the first byte of our data
// The 32-bit index of the beginning of our data
const data_i32_index = data_addr / 4;
const data_count = 16; // the number of 32-bit integers to set
const importObject = {
  // The objects WASM imports from JavaScript
  env: {
    mem: memory,
    data_addr: data_addr,
    data_count: data_count,
  },
};

const storeData = async () => {
  await WebAssembly.instantiate(new Uint8Array(bytes), importObject);
  for (let i = 0; i < data_i32_index + data_count + 4; i++) {
    let data = mem_i32[i];
    if (data !== 0) {
      console.log(`data[${i}]=${data}`);
    } else {
      console.log(`data[${i}]=${data}`);
    }
  }
};

storeData();
