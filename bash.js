var commands = require('./commands.js');

// Output a prompt
process.stdout.write('prompt > ');

// The stdin 'data' event fires after a user types in a line
process.stdin.on('data', function (data) {
  var cmd = data.toString().trim(); // remove the newline
  // cmd = commands.shellCommands(cmd);
  var userCommand;
  if (cmd === 'pwd') {
    process.stdout.write(commands[cmd]());
  } else if (cmd === 'date') {
    process.stdout.write(commands[cmd]());
  } else if (cmd === 'ls') {
    commands[cmd]();
  } else if (cmd.split(' ')[0] === 'echo') {
    process.stdout.write(commands["echo"](cmd));
  }

  process.stdout.write('\nprompt > ');
});
