const Command = require('./Command.js');
var config = require('../config.json');

const switchIcon = "<:switch:434587349117042698>";
const dsIcon = "<:ds:434587539173670913>";
const luma = "<:luma:463841535377539082>";
const greenLuma = "<:green_luma:463842174480547851>";
const orangeLuma = "<:orange_luma:463842174375821352>";
const blueLuma = "<:blue_luma:463841864773140490>";

class Welcome extends Command {
  constructor(msg) {
    super(msg);
    if (msg.author.id == config.alexsmbaratti) { // Admin only command
      msg.channel.send("**Hello. I am Rosalina.**\nI can store your Nintendo Switch, Nintendo 3DS, and Pokémon Go friend codes on Discord! I also have a variety of fun commands and privacy settings for your codes. \n\nTo get started, use `r!help` to view my commands.\n\nIf you need any help or have a suggestion, please join my support server, The Comet Observatory. https://discord.gg/kpFHWAq \n\nIf you find me useful, please consider voting for me on Discord Bot List. https://discordbots.org/bot/rosalina \n\nThank you and enjoy! " + luma);
    } else {
      msg.channel.send("The welcome command is a debugging tool only available for developers.");
    }
  }
}

module.exports = Welcome;
