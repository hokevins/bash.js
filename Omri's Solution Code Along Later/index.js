'use strict'

const debug = require('debug')('shell')
const clear = require('clear')
const readline = require('readline')

const parse = require('./parse')
const run = require('./run')

// readline gives us a nicer CLI, with history and, if we choose to implement it,
// tab completion.
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: '$ ',
})

rl.on('line', data => {
  const commands = parse(data)
  debug(commands)
  const done = (err, data) => {
    if (err) console.error(err)
    if (data) console.log(data)
    rl.prompt()
  }  
  run.pipe(commands, null, done)
})
rl.prompt()