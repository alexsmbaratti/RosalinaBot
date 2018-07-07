const Command = require('./Command.js');
var config = require('../config.json');

// r!suggest YOUR_SUGGESTION_HERE

const star = "433020245163114525";
const color = 0x86D0CF;

class Suggest extends Command {
  constructor(msg, client) {
    super(msg);
    if (msg.guild.id == config.COMET_OBSERVATORY_ID && msg.content.length > 10) {
      client.channels.get(config.COMET_OBSERVATORY_SUGGEST).send({
        embed: {
          author: {
            name: msg.author.username,
            icon_url: msg.author.avatarURL,
          },
          title: "Feature Suggestion",
          color: color,
          description: msg.content.substring(10) + "\nReference ID: `" + msg.id + "`",
          footer: {
            text: "If you like this suggestion, react to this message with a star."
          }
        }
      }).then(message => {
        message.react(message.guild.emojis.get(star));
      }).catch(console.error);
    }
  }
}

module.exports = Suggest;
