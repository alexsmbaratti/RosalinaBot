const Discord = require("discord.js");
const client = new Discord.Client();

var config = require('./config.json');
const DBL = require("dblapi.js");
const dbl = new DBL(config.DBL_TOKEN, client); // Requires Node 7.6 or later

// Classes
const Help = require('./commands/Help.js');
const EightBall = require('./commands/EightBall.js');
const Dice = require('./commands/Dice.js');
const Ping = require('./commands/Ping.js');
const Coin = require('./commands/Coin.js');
const SwitchCode = require('./commands/SwitchCode.js');
const DSCode = require('./commands/DSCode.js');
const Settings = require('./commands/Settings.js');
const MarioMaker = require('./commands/MarioMaker.js');
const SuperMarioOdyssey = require('./commands/SuperMarioOdyssey.js');
const Status = require('./commands/Status.js');
const UpdateGuilds = require('./cloudwatch/UpdateGuilds.js');
const Update3DSCodes = require('./cloudwatch/Update3DSCodes.js');
const UpdateSwitchCodes = require('./cloudwatch/UpdateSwitchCodes.js');
const UpdateBalloonCodes = require('./cloudwatch/UpdateBalloonCodes.js');

const build = "6.1.0";
const prefix = "r!";
const color = 0x86D0CF;
const star = "<:super_star_fill:433020245163114525>";
const switchIcon = "<:switch:434587349117042698>";
const dsIcon = "<:ds:434587539173670913>";

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
  if (client.user.id == config.CLIENT_ID) { // Client must be actual live bot for this block
    console.log("Live bot");
    new UpdateGuilds(client.guilds.size);
    new Update3DSCodes();
    new UpdateSwitchCodes();
    new UpdateBalloonCodes();

    client.channels.get(config.rosalinaBotTestChannel).send({
      embed: {
        title: "Client Restarted!",
        color: color,
        fields: [{
            name: "Build",
            value: build
          },
          {
            name: "Guilds Serving",
            value: client.guilds.size
          }
        ],
        footer: {
          text: "This message was automatically generated because an instance of RosalinaBot was started. This message is intended for development and debugging purposes and should only appear in a specific server."
        }
      }
    });
  } else if (process.env.USER == "travis") { // Travis-CI
    console.log("Compilation successful! Exiting with code 0.")
    process.exit(0);
  }
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
    } else if (input == "build" || input == "version") {
      msg.channel.send("Build: `" + build + "`");
    } else if (input == "guilds") {
      msg.channel.send("I am currently serving `" + client.guilds.size + "` guilds.");
      new UpdateGuilds(client.guilds.size);
    } else if (input.startsWith("switchcode")) {
      new SwitchCode(msg);
      new UpdateSwitchCodes();
    } else if (input.startsWith("3dscode") || input.startsWith("dscode")) {
      new DSCode(msg);
      new Update3DSCodes();
    } else if (input.startsWith("getswitchcode") || input.startsWith("setswitchcode")) {
      msg.channel.send(":x: " + msg.content.split("!")[1] + " is deprecated! Please use `r!switchCode` instead.");
    } else if (input.startsWith("getdscode") || input.startsWith("setdscode") || input.startsWith("get3dscode") || input.startsWith("set3dscode")) {
      msg.channel.send(":x: " + msg.content.split("!")[1] + " is deprecated! Please use `r!3DSCode` instead.");
    } else if (input.startsWith("settings")) {
      new Settings(msg);
    } else if (input.startsWith("smm")) {
      new MarioMaker(msg);
    } else if (input.startsWith("smo") || input.startsWith("balloon") || input.startsWith("balloonworld")) {
      new SuperMarioOdyssey(msg);
      new UpdateBalloonCodes();
    } else if (input.startsWith("vote")) {
      dbl.hasVoted(msg.author.id).then(voted => {
        if (voted) {
          msg.channel.send({
            embed: {
              title: "Vote on Discord Bot List",
              thumbnail: {
                url: client.user.avatarURL
              },
              url: "https://discordbots.org/bot/322405544490958849/vote",
              color: 0xFFD700,
              description: "Thank you for voting! Note that you can only vote once per 24 hours."
            }
          });
        } else {
          msg.channel.send({
            embed: {
              title: "Vote on Discord Bot List",
              thumbnail: {
                url: client.user.avatarURL
              },
              url: "https://discordbots.org/bot/322405544490958849/vote",
              color: color,
              description: "If you find this bot useful, please consider voting for it. Every vote helps! It's quick and easy!"
            }
          });
        }
      });
    } else if (input.startsWith("status")) {
      new Status(msg, build, client);
    }
  }
});

client.on('guildCreate', guild => {
  console.log(`Guild Create Triggered!`);
  if (client.user.id == config.CLIENT_ID) {
    try {
      guild.defaultChannel.send("Hello. I am RosalinaBot! To get started, use `r!help` to view my commands.");
      const DBL = require("dblapi.js");
      const dbl = new DBL(config.DBL_TOKEN, client); // Requires Node 7.6 or later
    } catch (e) {
      // If there is no default channel
    } finally {
      new UpdateGuilds(client.guilds.size);
    }
  }
});

client.on('guildDelete', guild => {
  console.log(`Guild Delete Triggered!`);
  new UpdateGuilds(client.guilds.size);
  const DBL = require("dblapi.js");
  const dbl = new DBL(config.DBL_TOKEN, client); // Requires Node 7.6 or later
});

client.login(config.TOKEN);
