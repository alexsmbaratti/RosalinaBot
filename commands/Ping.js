const Command = require('./Command.js');

class Ping extends Command {
  constructor(msg) {
    super(msg);
    let start = msg.createdTimestamp;
    console.log("Start: " + start);
    msg.channel.send('Pong')
      .then(message => {
        let diff = (message.createdTimestamp - start);
        message.edit(`Pong \`in ${diff}ms\``);
      })
      .catch(console.error);
  }
}

module.exports = Ping;
