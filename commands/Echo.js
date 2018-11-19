const Command = require('./Command.js');

// r!echo Test

class Echo extends Command {
  constructor(msg) {
    super(msg);
    if (msg.content.length > 6) {
      if (msg.mentions.everyone) {
        msg.channel.send(":x: Please do not abuse the echo command.");
      } else {
        msg.channel.send(msg.content.substring(7));
      }
    } else {
      msg.channel.send(":x: Invalid usage! Please type something after `r!echo`.");
    }
  }
}

module.exports = Echo;
