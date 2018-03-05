const Discord = require("discord.js");
const client = new Discord.Client();
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const url = 'mongodb://localhost:27017';
var config = require('./config.json');

// Classes
const Command = require('./commands/Command.js');
const Help = require('./commands/Help.js');
const EightBall = require('./commands/EightBall.js');
const Dice = require('./commands/Dice.js');
const Ping = require('./commands/Ping.js');
const Coin = require('./commands/Coin.js');
const SwitchCode = require('./commands/SwitchCode.js');
const DSCode = require('./commands/DSCode.js');
const UpdateGuilds = require('./cloudwatch/UpdateGuilds.js');

const build = "5.2.0";
const prefix = "r!";
const color = 0x86D0CF;

client.on('ready', () => {
  console.log(`✅ Logged in as ${client.user.username}!`);
  console.log(`🔨 Build: ${build}`);
  client.user.setPresence({
    status: 'online',
    afk: false,
    game: {
      name: "r!help for commands"
    }
  });
  new UpdateGuilds(client.guilds.size);
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
    } else if (input.startsWith("dice") || input.startsWith("die")) {
      new Dice(msg);
    } else if (input == "ping") {
      new Ping(msg);
    } else if (input == "coin") {
      new Coin(msg);
    } else if (input == "build") {
      msg.channel.send("Build: `" + build + "`");
    } else if (input == "guilds") {
      msg.channel.send("I am currently serving `" + client.guilds.size + "` guilds.");
    } else if (input.startsWith("switchcode")) {
      new SwitchCode(msg);
    } else if (input.startsWith("3dscode") || input.startsWith("dscode")) {
      new DSCode(msg);
    }
  }
});

client.on('guildCreate', guild => {
  console.log(`Guild Create Triggered!`);
  try {
    guild.defaultChannel.send("Hello. I am RosalinaBot! To get started, use `r!help` to view my commands.");
  } catch (e) {
    // If there is no default channel
  } finally {
    new UpdateGuilds(client.guilds.size);
  }
});

client.login(config.TOKEN);
