const Command = require('./Command.js');

class EightBall extends Command {
  constructor(msg) {
    super(msg);
    msg.channel.send(":x: Not implemented!")
  }
}

module.exports = EightBall;
