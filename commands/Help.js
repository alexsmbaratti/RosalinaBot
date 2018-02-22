const Command = require('./Command.js');

// Example usage of command: r!help 8ball
// Potential usage of command: r!help r!8ball

class Help extends Command {
  constructor(msg) {
    super(msg);
  }
}

module.exports = Help;
