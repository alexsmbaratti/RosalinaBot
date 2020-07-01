const Command = require('./Command.js');

// r!echod Test

class EchoDelete extends Command {
  constructor(msg) {
    super(msg);
    if (msg.content.length > 7) {
      if (msg.mentions.everyone) {
        msg.channel.send(":x: Please do not abuse the echo command.");
      } else {
        msg.channel.send(msg.content.substring(8))
          .then(message => {
            msg.delete()
              .catch(console.error);
          });
      }
    } else {
      msg.channel.send(":x: Invalid usage! Please type something after `r!echod`.");
    }
  }
}

module.exports = EchoDelete;
