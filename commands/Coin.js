const Command = require('./Command.js');

class Coin extends Command {
  constructor(msg) {
    super(msg);
    var headsTails = getRandomInt(0, 100);
    if (headsTails < 49) {
      msg.reply("It's heads.");
    } else if (headsTails < 99) {
      msg.reply("It's tails.");
    } else {
      msg.channel.send("Wait... What?!")
        .then(message => {
          msg.channel.startTyping();
          setTimeout(function() {
            msg.channel.send("Wow! I can't believe it! It landed on its side! Maybe try again?");
            msg.channel.stopTyping();
          }, 3000);
        });
    }
  }
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = Coin;
