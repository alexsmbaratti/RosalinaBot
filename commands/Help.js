const Command = require('./Command.js');
const fs = require('fs');

const categories = ["Codes", "Fun", "Technical", "Misc."];

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
      if (parsable == "die") { // Special case
        parsable = "dice";
      }
      if (parsable.toLowerCase() == "dscode") { // Special case
        parsable = "3dscode";
      }
      if (parsable.toLowerCase() == "server") { // Special case
        parsable = "support";
      }
      var found = false;
      fs.readFile('./commands/commands.json', 'utf8', function(err, data) {
        if (err) throw err;
        var obj = JSON.parse(data);
        for (var i = 0; i < obj.length; i++) {
          for (var j = 0; j < obj[i].length; j++) {
            if (obj[i][j].name.toLowerCase() == parsable.toLowerCase()) {
              msg.channel.send("**r!" + obj[i][j].name + "**\n" + obj[i][j].help);
              found = true;
              break;
            }
          }
        }
        if (found == false) {
          msg.channel.send(":x: Command not found!");
        }
      });
    } catch (e) { // General r!help
      fs.readFile('./commands/commands.json', 'utf8', function(err, data) {
        if (err) throw err;
        var obj = JSON.parse(data);
        var message = "**Command List**\nBasic command structure is `r![command]`. Commands are *not* case-sensitive. Use `r!help [command]` for more information about that command.\n";
        for (var i = 0; i < obj.length; i++) {
          message += "\n**" + categories[i] + "** - ";
          for (var j = 0; j < obj[i].length; j++) {
            message += "`" + obj[i][j].name + "` ";
          }
        }
        msg.channel.send(message);
      });
    }
  }
}

module.exports = Help;
