const Discord = require("discord.js");
const client = new Discord.Client();
var config = require('./config.json');

// Classes
const Command = require('./commands/Command.js');
const Help = require('./commands/Help.js');
const EightBall = require('./commands/EightBall.js');

const build = "5.2.0";
const prefix = "r!";
const color = 0x86D0CF;

client.on('ready', () => {
  console.log(`Logged in as ${client.user.username}!`);
  console.log("Build: " + build);
  client.user.setPresence({
    status: 'online',
    afk: false,
    game: {
      name: "r!help for commands",
      url: "https://www.nintendo.com"
    }
  });
});

client.on('message', msg => {
  if (msg.content.toLowerCase().startsWith(prefix) && msg.author.bot != true) {
    var input = msg.content.toLowerCase().substring(prefix.length);
    if (input.startsWith("help")) {
      new Help(msg);
    } else if (input.startsWith("8ball")) {
      new EightBall(msg);
    } else if (input == "github") {
      msg.channel.send({
        embed: {
          author: {
            name: "GitHub",
            icon_url: "https://raw.githubusercontent.com/alexsmbaratti/RosalinaBot/master/misc/github-favicon.png"
          },
          title: "RosalinaBot",
          thumbnail: {
            url: client.user.avatarURL
          },
          url: "https://github.com/alexsmbaratti/RosalinaBot/",
          color: color,
          description: "View the source code, request features, and report bugs.",
        }
      });
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
