const Command = require('./Command.js');
const fs = require('fs');

const categories = ["Codes", "Fun", "Technical", "Misc."];
const color = 0x86D0CF;

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
      if (parsable.toLowerCase() == "dscode" || parsable.toLowerCase() == "ds") { // Special case
        parsable = "3dscode";
      }
      if (parsable.toLowerCase() == "server") { // Special case
        parsable = "support";
      }
      if (parsable.toLowerCase() == "sc") { // Special case
        parsable = "switchcode";
      }
      var found = false;
      fs.readFile('./commands/commands.json', 'utf8', function(err, data) {
        if (err) throw err;
        var obj = JSON.parse(data);
        for (var i = 0; i < obj.length; i++) {
          for (var j = 0; j < obj[i].length; j++) {
            if (obj[i][j].name.toLowerCase() == parsable.toLowerCase()) {
              msg.channel.send({
                embed: {
                  author: {
                    name: "Help"
                  },
                  title: "**r!" + obj[i][j].name + "**",
                  color: color,
                  description: obj[i][j].help,
                }
              });
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
        var message = [];
        for (var i = 0; i < obj.length; i++) {
          message[i] = "";
          for (var j = 0; j < obj[i].length; j++) {
            message[i] += "`" + obj[i][j].name + "` ";
          }
        }
        msg.channel.send({
          embed: {
            author: {
              name: "Help"
            },
            title: "**Command List**",
            color: color,
            description: "Basic command structure is `r![command]`. Commands are *not* case-sensitive. Use `r!help [command]` for more information about that command.",
            fields: [{
                name: categories[0],
                value: message[0]
              },
              {
                name: categories[1],
                value: message[1]
              },
              {
                name: categories[2],
                value: message[2]
              },
              {
                name: categories[3],
                value: message[3]
              }
            ]
          }
        });
      });
    }
  }
}

module.exports = Help;
