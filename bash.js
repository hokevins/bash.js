var commands = require('./commands.js');

// Output a prompt
process.stdout.write('prompt > ');

// The stdin 'data' event fires after a user types in a line
process.stdin.on('data', function (data) {
  var cmd = data.toString().trim(); // remove the newline
  cmd = commands.shellCommands(cmd);
  process.stdout.write(cmd);
  process.stdout.write('\nprompt > ');

});
