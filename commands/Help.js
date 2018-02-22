const Command = require('./Command.js');

// Example usage of command: r!help 8ball
// Potential usage of command: r!help r!8ball

class Help extends Command {
  constructor(msg) {
    super(msg);
    try {
      var parsable = msg.content.split(" ")[1]; // r!help r!8ball
      if (parsable.startsWith("r!")) { // r!8ball
        parsable = parsable.substring(2); // -> 8ball
      }
      msg.reply(parsable);
    } catch(e) {
      msg.reply("Command not in database!");
    }
  }
}

module.exports = Help;
