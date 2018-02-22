const Discord = require("discord.js");
const client = new Discord.Client();
var config = require('./config.json');

const Command = require('./commands/Command.js');
const Help = require('./commands/Help.js');

const build = "5.2.0";
const prefix = "r!";

client.on('ready', () => {
  console.log(`Logged in as ${client.user.username}!`);
  console.log("Build: " + build);
});

client.on('message', msg => {
  if (msg.content.toLowerCase().startsWith(prefix)) {
    switch (msg.content.toLowerCase().substring(2)) {
      case `help`:
        new Help(msg);
        break;
    }
  }
});

client.on('guildCreate', guild => {
  console.log(`Guild Create Triggered!`);
  try {
    guild.defaultChannel.send("Hello. I am RosalinaBot! To get started, use `r!help` to view my commands.");
  } catch (e) {
    // If there is no default channel
  }
});

client.login(config.TOKEN);
