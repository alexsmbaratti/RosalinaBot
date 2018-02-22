const Command = require('./Command.js');
const fs = require('fs');

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
      var found = false;
      fs.readFile('./commands/commands.json', 'utf8', function(err, data) {
        if (err) throw err;
        var obj = JSON.parse(data);
        for (var i = 0; i < obj.length; i++) {
          console.log(obj[i].name + "|" + parsable);
          if (obj[i].name == parsable) {
            msg.channel.send("**r!" + obj[i].name + "**\n" + obj[i].help);
            found = true;
          }
        }
        if (found == false) {
          msg.channel.send(":x: Invalid usage!");
        }
      });
    } catch (e) {
      msg.channel.send(":x: Invalid usage!");
    }
  }
}

module.exports = Help;
