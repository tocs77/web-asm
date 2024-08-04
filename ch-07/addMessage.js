//const sleep = m => new Promise(r => setTimeout(r, m)); var output = null;
let add_message_function;
const log_add_message = (a, b, sum) => {
  const output = document.getElementById('output');
  if (output == null) {
    console.log('page load not complete:log_add_message');
    return;
  }
  output.innerHTML += `${a} + ${b} = ${sum}<br>`;
};
let importObject = {
  env: {
    log_add_message: log_add_message,
  },
};

const calcSum = () => {
  const a = document.getElementById('a_val').value;
  const b = document.getElementById('b_val').value;
  const sum = add_message_function(a, b);
  console.log(`${a} + ${b} = ${sum}`);
  log_add_message(a, b, sum);
};

(async () => {
  // await sleep(5000); let obj = await

  let obj = await WebAssembly.instantiateStreaming(fetch('addMessage.wasm'), importObject);
  add_message_function = obj.instance.exports.add_message;
  let btn = document.getElementById('add_message_button');
  btn.addEventListener('click', calcSum);
  btn.style.display = 'block';
})();
