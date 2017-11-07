module.exports = function parse(input) {
  return input.toString().trim()
    .split('|')
    .map(cmd => cmd
      .trim()
      .split(/\s+/)
      .map(word => {   
        if (word.startsWith('$')) {
          // Perform interpolation          
          return process.env[word.slice(1)]
        }
        return word
      })
    )
}
