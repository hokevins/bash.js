const fs = require('fs')

/**
 * command(args: [...String],
 *         stdin: String,
 *         done: (err: Error?, data: String?) -> ())
 */
const commands = module.exports = {
  /**
   * Echo args to stdout.
   * 
   * @param {*} args 
   * @param {*} stdin 
   * @param {*} done 
   */
  echo(args, stdin, done) {
    // Note: Echo calls its callback synchronously. The signature of a command
    // we specified above doesn't really say whether the callback is called
    // synchronously (before the command returns) or async (after).
    //
    // It should *probably* be asynchronous, though. We could use process.nextTick,
    // like we do in `clear`.
    done(null, args.join(' '))
  },

  /**
   * Exits the process with the specified code. In shell land, 0 is success, and
   * all other codes indicate some error. Default is zero.
   * 
   * done is never called, because the shell process exits.
   * 
   * @param {[int]} [code] - the exit code
   * @param {*} stdin
   * @param {*} done 
   */
  exit([code=0], stdin, done) {
    process.exit(code)
  },

  /**
   * Clears the terminal.
   * 
   * @param {*} args 
   * @param {*} stdin 
   * @param {*} done 
   */
  clear(args, stdin, done) {
    clear()
    // Call done asynchronously, even though we don't have to.
    // This makes it predictable for the caller—they *know* that the callback
    // won't be called until after their callstack clears.
    process.nextTick(done)
  },

  /**
   * Print the date to the terminal.
   * @param {*} args 
   * @param {*} stdin 
   * @param {*} done 
   */
  date(args, stdin, done) {
    done(null, new Date().toString())
  },

  ls(args, stdin, done) {
    return fs.readdir('.', (err, files) => {
      if (err) return done(err)
      done(null, files.join('\n'))
    })
  },

  cat(files, stdin, done, mapFile=buffer => buffer.toString()) {
    // If standard in was provided, return immediately with it, applying
    // the transform.
    if (stdin) { return done(null, mapFile(stdin)) }

    const buffers = []
    let outstandingReads = files.length
    files.forEach((file, index) =>
      fs.readFile(file, (err, data) => {
        buffers[index] = err || data
        if (--outstandingReads === 0) {
          done(null, buffers
            .map(mapFile)
            .join('\n'))
        }
      }))
  },

  head(files, stdin, done) {
    commands.cat(files, stdin, done,
      buffer => buffer
        .toString()
        .split('\n')
        .slice(0, 10)
        .join('\n'))
  },

  upcase(files, stdin, done) {
    done(null, stdin.toUpperCase())
  },

  tail(files, stdin, done) {
    commands.cat(files, stdin, done,
      buffer => buffer
        .toString()
        .split('\n')
        .slice(-10)
        .join('\n'))
  },
}