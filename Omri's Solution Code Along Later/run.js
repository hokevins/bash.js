const child_process = require('child_process')
const commands = require('./commands')

module.exports = {
  command: runCommand,
  pipe: runPipe
}

function runCommand([cmd, ...args], stdin, done) {
  if (cmd in commands) {
    commands[cmd](args, stdin, done)
  } else {
    // If we don't find a command in our set of built in commands, try
    // to run it as an external process.
    //
    // execFile looks for `cmd` on the path and runs it with `args` if
    // it's found.
    const child = child_process.execFile(cmd, args, (err, stdout, stderr) => {
      if (err) {
        // If the child process failed, fail with its error.
        done(err)
        return
      }
      // Otherwise, succeed with its output.
      done(null, stdout)
    })
    // If we received input on stdin, write it to the child.
    if (stdin) {
      child.stdin.write(stdin)
    }
    // We need to close the child's stdin to tell it we have nothing more
    // to say. Otherwise, it'll never exit.    
    child.stdin.end()
  }
}

function runPipe(pipeline, stdin=null, done) {
  if (!pipeline.length) {
    return done(null, stdin)
  }
  const [firstCommand, ...restOfTheCommands] = pipeline
  // Run the first command in the pipe
  runCommand(firstCommand, stdin, (err, data) => {
    // When it's finished...
    // If it failed, the entire pipeline is done (with that error)
    if (err) {
      done(err)
      return // don't run the rest of the pipe
    }
    // Otherwise, run the rest of the pipe with the data
    // we got back from the first command.
    runPipe(restOfTheCommands, data, done)
  })
}
