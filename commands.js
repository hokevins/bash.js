exports.shellCommands = function(cmd) {
  if (cmd === 'pwd') {
    cmd = process.argv[1];
  } else if (cmd === 'date') {
    cmd = new Date().toString();
  }
  return cmd;
}
