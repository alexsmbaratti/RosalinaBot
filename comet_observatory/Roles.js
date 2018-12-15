const Command = require('../commands/Command.js');
var config = require('../config.json');

// r!role SSBU

class Roles extends Command {
  constructor(msg, client) {
    super(msg);
    if (msg.guild.id == config.COMET_OBSERVATORY_ID) {
      if (msg.content.includes(" ")) {
        if (msg.content.split(" ")[1].toLowerCase() == "ssbu") { // Request for SSBU Role
          if (msg.member.roles.get("522476246588850178") != null) {
            msg.member.removeRole('522476246588850178')
              .then(msg.reply("You have removed the Super Smash Bros. Ultimate role."))
              .catch(console.error);
          } else {
            msg.member.addRole('522476246588850178')
              .then(msg.reply("You have added the Super Smash Bros. Ultimate role."))
              .catch(console.error);
          }
        } else {
          msg.channel.send(":x: **Invalid role!**\nPlease use a valid role.\n\n**Available Roles**\n```\nSSBU\n```")
        }
      } else {
        msg.channel.send(":x: **Invalid usage!**\nPlease specify the role you want to toggle.\n\n*Usage Example*\n`r!role SSBU`\n\n**Available Roles**\n```\nSSBU\n```")
      }
    }
  }
}

module.exports = Roles;
