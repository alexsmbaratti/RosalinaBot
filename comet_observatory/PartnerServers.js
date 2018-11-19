const Command = require('../commands/Command.js');
var config = require('../config.json');
const fs = require(`fs`);

// r!partner [MESSAGE]
// ONE USE PER USER
// Check for discord.gg

class PartnerServers extends Command {
  constructor(msg, client) {
    super(msg);
    var partnerMessage = msg.content.substring(10);
    
  }
}

module.exports = PartnerServers;
