import { readFileSync } from 'fs';
import { dirname } from 'path';

const __dirname = dirname(new URL(import.meta.url).pathname);
const bytes = readFileSync(__dirname + '/strings.wasm');
let memory = new WebAssembly.Memory({ initial: 1 });
const maxMem = 65535;
let importObject = {
  env: {
    buffer: memory,
    str_pos_len: function (strPos, strLen) {
      const bytes = new Uint8Array(memory.buffer, strPos, strLen);
      const log_string = new TextDecoder('utf8').decode(bytes);

      console.log(log_string);
    },
    null_str: function (strPos) {
      let bytes = new Uint8Array(memory.buffer, strPos, maxMem - strPos);
      let log_string = new TextDecoder('utf8').decode(bytes);
      log_string = log_string.split('\0')[0];
      console.log(log_string);
    },
    len_prefix: function (strPos) {
      const strLen = new Uint8Array(memory.buffer, strPos, 1)[0];
      const bytes = new Uint8Array(memory.buffer, strPos + 1, strLen);
      const log_string = new TextDecoder('utf8').decode(bytes);
      console.log(log_string);
    },
  },
};

const testStrings = async () => {
  let obj = await WebAssembly.instantiate(new Uint8Array(bytes), importObject);
  let main = obj.instance.exports.main;
  main();
};
testStrings();
