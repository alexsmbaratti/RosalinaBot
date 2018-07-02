const Command = require('./Command.js');
var config = require('../config.json');
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';

const switchIcon = "<:switch:434587349117042698>";
const dsIcon = "<:ds:434587539173670913>";

class Welcome extends Command {
  constructor(msg) {
    super(msg);
    if (msg.author.id == config.alexsmbaratti) { // Admin only command
      msg.channel.send("Hello. I am RosalinaBot! To get started, use `r!help` to view my commands.\nIn short, I can store your friend codes on Discord so you can send them to your server or to keep for reference. I also have a variety of fun commands and privacy settings for your codes. If you have any troubles or suggestions, please post your thoughts at my support server.");
    } else {
      msg.channel.send("The welcome command is a debugging tool only available for developers.");
    }
  }
}

module.exports = Welcome;
