const Command = require('./Command.js');

class EightBall extends Command {
  constructor(msg) {
    super(msg);
    var parsable = msg.content.substring(7);
    if (parsable.length > 1) {
      msg.reply("The stars say...")
        .then(message => {
          setTimeout(function() {
            var result = getRandomInt(1, 6);
            var response = "";
            switch (result) {
              case 1:
                response = "yes";
                break;
              case 2:
                response = "no";
                break;
              case 3:
                response = "try again later";
                break;
              case 4:
                response = "probable";
                break;
              case 5:
                response = "unlikely";
                break;
              case 6:
                response = "unsure";
                break;
              default:
                response = "nothing";
                break;
            }
            message.edit(message.content + " `" + response + "`");
          }, 1000);
        })
        .catch(console.error);
    } else { // No query
      msg.channel.send(":x: Invalid usage!");
    }
  }
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = EightBall;
