const Command = require('./Command.js');

class Dice extends Command {
  constructor(msg) {
    super(msg);
    var numberOfDie = msg.content.split(" ")[1];
    if (numberOfDie == "undefined" || numberOfDie == "1") {
      msg.channel.send("Your die landed on " + getDiceRoll());
    } else if (parseInt(numberOfDie) < 0) {
      msg.channel.send("I don't believe it is possible to roll a negative amount of dice.");
    } else if (parseInt(numberOfDie) == 0) {
      msg.channel.send("I don't believe it is possible to roll zero dice.");
    } else if (parseInt(numberOfDie) > 10) {
      msg.channel.send("Sorry. I can only roll up to ten dice at once.");
    } else if (parseInt(numberOfDie) > 1 && parseInt(numberOfDie) < 11) {
      var message = "Your numbers are: ";
      for (var i = 0; i < parseInt(numberOfDie); i++) {
        message += "`" + getDiceRoll() + "` ";
      }
      msg.channel.send(message);
    } else {
      msg.channel.send("Your die landed on " + getDiceRoll());
    }
  }
}

function getDiceRoll() {
  return Math.floor(Math.random() * (6 - 1 + 1)) + 1;
}

module.exports = Dice;
