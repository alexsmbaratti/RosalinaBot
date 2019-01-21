const Command = require('../commands/Command.js');
const color = 0x86D0CF;

// r!ssbu ARENA_ID PASSWORD
// Passwords can only be numbers and are optional
// Example Arena ID: N0H1P

class Arena extends Command {
  constructor(msg) {
    super(msg);
    var arg1;
    var arg2;
    var name;
    try {
      arg1 = msg.content.split(" ")[1].toUpperCase();
      arg1.length;
    } catch (e) {
      arg1 = "";
    }
    try {
      arg2 = msg.content.split(" ")[2];
      arg2.length;
    } catch (e) {
      arg2 = "";
    }
    try {
      name = msg.member.displayName;
    } catch (e) {
      name = msg.author.username;
    }

    if (arg1 == "") { // No arguments given
      msg.channel.send(":x: Invalid usage!\nCorrect usage is: `r!ssbu [ID] [PASSWORD]`. Password is optional.")
    } else { // First argument given
      if (arg1.length == 5 || arg1.toLowerCase() == "friend") { // Valid ID
        if (arg2.length > 8 || isNaN(arg2)) {
          msg.channel.send(":x: Password was invalid.")
        } else {
          if (arg2 == "") { // No password
            arg2 = "No password"
          }
          if (arg1.toLowerCase() == "friend") {
            arg1 = "Friends Only";
          }
          msg.channel.send({
            embed: {
              author: {
                name: name + " wants to battle!",
                icon_url: msg.author.avatarURL
              },
              color: color,
              title: "**Super Smash Bros. Ultimate Battle Arena**",
              fields: [{
                  name: "Arena ID",
                  value: arg1,
                  inline: true
                },
                {
                  name: "Password",
                  value: arg2,
                  inline: true
                }
              ],
              thumbnail: {
                url: "https://raw.githubusercontent.com/alexsmbaratti/RosalinaBot/indev/misc/smash_emblem_white.png"
              },
              footer: {
                text: "Requires an active Nintendo Switch Online subscription to join"
              }
            }
          }).then(message => {
            msg.delete();
          }).catch(console.error);
        }
      } else { // ID not valid
        msg.channel.send(":x: Arena ID was invalid.")
      }
    }
  }
}

module.exports = Arena;
