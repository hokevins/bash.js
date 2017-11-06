// console.log(process.argv);

// Output a prompt
process.stdout.write('prompt > ');

// The stdin 'data' event fires after a user types in a line
process.stdin.on('data', function (data) {
  var cmd = data.toString().trim(); // remove the newline

  if (cmd === 'pwd') {
    cmd = process.argv[1];
  }
  else if (cmd === 'date') {
   cmd = new Date().toString();
  }
  process.stdout.write(cmd);
  process.stdout.write('\nprompt > ');

});
