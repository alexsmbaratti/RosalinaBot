const Command = require('./Command.js');
var config = require('../config.json');

// r!bug YOUR_BUG_HERE

const star = "433020245163114525";
const color = 0x86D0CF;

class Bug extends Command {
  constructor(msg, client) {
    super(msg);
    if (msg.guild.id == config.COMET_OBSERVATORY_ID && msg.content.length > 6) {
      client.channels.get(config.COMET_OBSERVATORY_BUG).send({
        embed: {
          author: {
            name: msg.author.username,
            icon_url: msg.author.avatarURL,
          },
          title: "Bug Report",
          color: color,
          description: msg.content.substring(10) + "\nReference ID: `" + msg.id + "`",
          footer: {
            text: "If this bug affects you too, react to this message with a star."
          }
        }
      }).then(message => {
        message.react(message.guild.emojis.get(star));
      }).catch(console.error);
    }
  }
}

module.exports = Bug;
