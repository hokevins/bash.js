// exports.shellCommands = function(cmd) {
//   if (cmd === 'pwd') {
//     cmd = process.argv[1];
//   } else if (cmd === 'date') {
//     cmd = new Date().toString();
//   }
//   return cmd;
// }

var fs = require('fs');

module.exports = {
  pwd: function(input) {
    return process.cwd();
    // return process.argv[1];
  },

  date: function(input) {
    return Date();
    // return new Date().toString();
  },

  ls: function(input) {
    fs.readdir('.', function(err, files) {
      if (err) throw err; // WARNING, YOU DON'T WANT SILENT ERRORS, KEY CODE!

      // files.forEach(function(file) {
      //   process.stdout.write(file.toString() + "\n");
      // });
      process.stdout.write(files.join('\n'));
      process.stdout.write("prompt > ");
    });
  },

  echo: function(input) {
    return input.split(' ').slice(1).join(' ');
    // return input.split(' ')
    //   .map(function(arg) {
    //     return (arg[0] === '$') ? process.env[arg.slice(1)] : arg;
    //   })
    //   .join(' ');
  }

  // ls: function() {
  //   fs.readdir('.', function(err, files) {
  //     if (err){
  //       throw err;
  //     }
  //     files.forEach(function(file) {
  //       console.log(file);
  //       return file.toString() + "\n";
  //     });
  //   });
  // }
}
