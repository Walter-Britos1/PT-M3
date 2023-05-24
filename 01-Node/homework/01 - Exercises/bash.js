const process = require('process');
const { Z_ASCII } = require('zlib');
const commands = require('./commands/index.js');

function bash() {
  process.stdout.write("prompt > " );
  process.stdin.on('data', (data) => {
    var args = data.toString().trim().split(' ');
    var cmd =  args[0];
    commands[cmd] ? commands[cmd](print, args) :  print(`command not found: ${cmd}`);
  })
};

function print (output) {
  process.stdout.write(output);
  process.stdout.write("\nprompt > ")
}

bash();
module.exports = {
   print,
   bash,
};
