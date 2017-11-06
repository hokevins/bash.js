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
      if (err) throw err;
      files.forEach(function(file) {
        process.stdout.write(file.toString() + "\n");
      })
      process.stdout.write("prompt > ");
    });
  },

  echo: function(input) {
    return input.split(' ').slice(1).join(' ');
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
