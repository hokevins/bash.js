const commands = require('./commands.js');
const chalk = require('chalk');

const prompt = chalk.blue('\nprompt > ');

// Output a prompt
process.stdout.write('prompt > ');

// The stdin 'data' event fires after a user types in a line
process.stdin.on('data', function (data) {
  const cmd = data.toString().trim();
  // .trim() removes the newline
  // cmd = commands.shellCommands(cmd);

  if (cmd === 'pwd') {
    process.stdout.write(commands[cmd]());
  } else if (cmd === 'date') {
    process.stdout.write(commands[cmd]());
  } else if (cmd === 'ls') {
    commands[cmd]();
  } else if (cmd.split(' ')[0] === 'echo') {
    process.stdout.write(commands["echo"](cmd));
  } else {
    process.stderr.write(chalk.red('command not found: ') + cmd);
  }

  process.stdout.write(prompt);
});
