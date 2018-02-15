const Discord = require("discord.js");
var AWS = require("aws-sdk");
var config = require('./config.json');
const client = new Discord.Client();

const alex = config.alexID;
const rosalinaRole = config.rosalinaRole;
var rosalinaID;
var rosalinaBotTestChannel;

const build = "5.1.4";
var host_ip = "0.0.0.0";
var platform = "undefined";

// TODO: Make multi server friendly
var voiceChannel;
var mConnection;

// JSON
var jsonText = '{ "users" : [' +
  '{ "userID":"-1", "switchCode":"-1", "dsCode":"-1", "switchPrivacy": "PRIVATE", "dsPrivacy": "PRIVATE", "starbits": 0, "exp": 0, "level": 1} ]}';
var json = JSON.parse(jsonText);
var length = json['users'].length;
var fs = require("fs");

// AWS
AWS.config.update({
  region: "us-west-2",
  endpoint: "https://dynamodb.us-west-2.amazonaws.com"
});
var docClient = new AWS.DynamoDB.DocumentClient();
AWS.config.loadFromPath('./config.json');
var cw = new AWS.CloudWatch({
  apiVersion: '2010-08-01'
});

client.on('ready', () => {
  console.log(`Logged in as ${client.user.username}!`);
  console.log("Build: " + build);
  rosalinaID = client.user.id;
  rosalinaBotTestChannel = client.channels.get(config.rosalinaBotTestChannel);
  updateGuildsToAWS();

  host_ip = process.argv[2];
  console.log("Host IP is: " + host_ip);
  if (process.argv[3] != "undefined") {
    platform = process.argv[3];
    if (platform == "Pi") {
      platform = "Raspberry Pi";
    }
    rosalinaBotTestChannel.send({
      embed: {
        title: "Client Restarted!",
        color: 0x86D0CF,
        fields: [{
            name: "Build",
            value: build
          },
          {
            name: "Platform",
            value: platform
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
  } else {
    rosalinaBotTestChannel.send("<@" + alex + ">, this instance was created without proper arguments!");
    rosalinaBotTestChannel.send({
      embed: {
        title: "Client Restarted!",
        color: 0x86D0CF,
        fields: [{
            name: "Build",
            value: build
          },
          {
            name: "Platform",
            value: "Not defined"
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
  }

  setGame("r!help for commands");
  readJSON();
});

client.on('guildCreate', guild => {
  console.log(`Guild Create Triggered!`);
  try {
    guild.defaultChannel.send("Hello. I am RosalinaBot! To get started, use `r!help` to view my commands.");
  } catch (e) {
    // If there is no default channel
  }
  updateGuildsToAWS();
});

client.on('message', msg => {
  updateGuildsToAWS();
  readJSON();
  if (msg.author.bot != true) { // TODO: Change to ID
    if ((msg.channel.type == 1) || (msg.content.toLowerCase().includes("<@" + rosalinaID + ">"))) {
      console.log(' - Channel type is ' + msg.channel.type);
      if (msg.content.toLowerCase().includes('hello') || msg.content.toLowerCase().includes('hi')) {
        console.log('Recieved greeting from ' + msg.author.username);
        msg.reply('Hello ' + msg.author.username);
      }
    }

    if (msg.content.toLowerCase() == "r!ip" && msg.author.id == alex) {
      if (host_ip != "0.0.0.0") {
        msg.channel.send("Host IP: `" + host_ip + "`")
          .then(message => {
            setTimeout(function() {
              message.edit("Host IP: `REDACTED`");
            }, 5000);
          });
      } else {
        msg.channel.send("This instance of RosalinaBot was not given the proper arguments to provide an IP address.");
      }
    }

    // XP and Level Block
    if (false == true) {
      if (findUserinJSON(msg) == 0) { // If user is not in database
        addUserToJSON(msg);
      }
      var userIndex = findUserinJSON(msg);
      json.users[userIndex].exp += 5;
      if (json.users[userIndex].exp >= 2 ^ json.users[userIndex].level + 158) {
        json.users[userIndex].level += 1;
        msg.channel.send({
          embed: {
            color: 0x86D0CF,
            author: {
              name: msg.author.username + " Leveled Up!",
              icon_url: msg.member.user.avatarURL
            },
            description: "Level " + json.users[userIndex].level,
            footer: {
              text: "Earn XP by using RosalinaBot's commands and participating in chat."
            }
          }
        });
      }
    }
  }

  if (msg.content == "r!join") {
    console.log(" - Recieved request to join voice channel.");
    // TODO: Make more efficient
    console.log(" - Checking voiceChannel...");
    console.log(" - msg.member.voiceChannel = " + msg.member.voiceChannel);
    if (true == true) { // To disable with ease
      if (msg.member.voiceChannel != undefined) {
        voiceChannel = msg.member.voiceChannel;
        msg.member.voiceChannel.join().then(connection => {
          mConnection = connection;
          if (msg.member.voiceChannel.name.toLowerCase().includes("mario kart")) {
            setGame("Mario Kart");
          }
          msg.reply("I have joined your voice channel.");
          connection.playFile("./sounds/discord_join.mp3");
          // TODO: Auto-leave
          // TODO: Check if this overloads with multiple users
          client.on('voiceStateUpdate', member => {
            if (msg.author.id == member.id) {
              voiceChannel.leave();
            }
          });
        });
      } else {
        msg.reply("Sorry, I do not believe you are in a voice channel.");
      }
    }
  }

  if (msg.content.toLowerCase() == "r!shockdodge" && false == true) { // TODO: Make more efficient to allow for more audio files
    console.log(" - Recieved request to join voice channel.");
    if (true == true) { // To disable with ease
      if (msg.member.voiceChannel != undefined) {
        voiceChannel = msg.member.voiceChannel;
        console.log(" - msg.member.voiceChannel = " + msg.member.voiceChannel);
        voiceChannel.join().then(connection => {
          connection.playFile("./sounds/bam_shock_dodge.mp3");
          client.on('voiceStateUpdate', member => {
            if (msg.author.id == member.id) {
              voiceChannel.leave();
            }
          });
        });
      } else {
        msg.reply("Sorry, I do not believe you are in a voice channel.");
      }
    } else {
      msg.reply("Sorry, this command is not currently operational.");
    }
  }

  if (msg.content.toLowerCase() == "r!shockdodge2") {
    console.log(" - Recieved request to join voice channel.");
    if (true == true) { // To disable with ease
      if (msg.member.voiceChannel != undefined) {
        voiceChannel = msg.member.voiceChannel;
        console.log(" - msg.member.voiceChannel = " + msg.member.voiceChannel);
        voiceChannel.join().then(connection => {
          connection.playFile("./sounds/bam_shock_dodge_2.mp3");
          client.on('voiceStateUpdate', member => {
            if (msg.author.id == member.id) {
              voiceChannel.leave();
            }
          });
        });
      } else {
        msg.reply("Sorry, I do not believe you are in a voice channel.");
      }
    }
  }

  if (msg.content.toLowerCase() == "r!weeabogarbage") { // TODO: Make more efficient to allow for more audio files
    console.log(" - Recieved request to join voice channel.");
    if (true == false) { // To disable with ease
      if (msg.member.voiceChannel != undefined) {
        voiceChannel = msg.member.voiceChannel;
        console.log(" - msg.member.voiceChannel = " + msg.member.voiceChannel);
        voiceChannel.join().then(connection => {
          var path;
          var songName;
          switch (getRandomInt(0, 3)) {
            case 0:
              path = "./sounds/bensoncut.mp3";
              songName = "Benson Cut - Future Girlfriend";
              break;
            case 1:
              path = "./sounds/japanese.mp3";
              songName = "San No Nyaa To Iu To Demo Omotta Ka - android52";
              break;
            case 2:
              path = "./sounds/3dworld.mp3";
              songName = "Super Anime Groove 3D World - android52";
              break;
            case 3:
              path = "./sounds/newanime.mp3";
              songName = "The New Anime Groove - android52";
              break;

          }
          connection.playFile(path);
          msg.channel.send({
            embed: {
              color: 0x86D0CF,
              title: "Now Playing",
              description: songName
            }
          });
          client.on('voiceStateUpdate', member => {
            if (msg.author.id == member.id) {
              voiceChannel.leave();
            }
          });
        });
      } else {
        msg.reply("Sorry, I do not believe you are in a voice channel.");
      }
    } else {
      msg.reply("Sorry, this command is not currently operational.");
    }
  }

  if (msg.content == "r!leave") {
    // TODO: Check if in a voice channel
    // TODO: Make friendly for multiple servers
    console.log(" - Recieved request to leave voice channel.");
    if (client.voiceConnections.has(msg.member.voiceChannel.id)) {
      msg.member.voiceChannel.leave();
      msg.reply("I have left your voice channel.");
      randomGame();
    }
  }

  if (msg.content == ('r!channel')) {
    console.log(" - Request for channel info");
    msg.channel.send({
      embed: {
        title: "#" + msg.channel.name + " Info",
        color: 0x86D0CF,
        fields: [{
            name: "ID",
            value: msg.channel.id
          },
          {
            name: "Type",
            value: msg.channel.type
          }
        ]
      }
    });
  }

  if (msg.content.toLowerCase() == ('r!randomgame')) {
    console.log(" - Request for game change");
    if (msg.author.id == alex) {
      msg.channel.send("Set current game to: `" + randomGame() + "`");
    } else {
      msg.reply("You do not have permission to use this command.");
    }
  }

  if (msg.content.toLowerCase() == ('r!guilds')) {
    msg.reply("I am currently serving `" + client.guilds.size + "` guilds.");
  }

  if (msg.content.toLowerCase().includes("r!setswitchcode") && msg.author.id != rosalinaID) {
    if (findUserinJSON(msg) == 0) { // If user is not in database
      addUserToJSON(msg);
    }
    console.log(" - Request to set Nintendo Switch friend code");
    if (msg.content.substring(16) == "") {
      console.log(" - No code detected!");
      msg.reply("Usage: r!setSwitchCode SW-YOUR_CODE_HERE");
    } else if (msg.content.substring(16) == "clear") {
      console.log(" - Request for cleared Switch Code");
      var userIndex = findUserinJSON(msg);
      if (json.users[userIndex].switchCode != "-1") {
        json.users[userIndex].switchCode = "-1"
        writeJSON();
        msg.reply("Your Nintendo Switch friend code has been removed from my knowledge.");
      } else {
        msg.reply("I don't have a Nintendo Switch friend code under your name. Please set one using r!setSwitchCode.");
      }
    } else {
      if (validateSwitchCode(msg.content.substring(16))) {
        console.log("  - Switch Code is: " + msg.content.substring(16));
        var userIndex = findUserinJSON(msg);
        console.log("  - Saved Switch Code is: " + json.users[userIndex].switchCode);
        json.users[userIndex].switchCode = msg.content.substring(16);
        json.users[userIndex].starbits += 500;
        writeJSON();
        msg.reply("I have saved your Nintendo Switch friend code. Your current privacy setting for your Nintendo Switch friend code is " + json.users[userIndex].switchPrivacy + ". To access your Nintendo Switch friend code in the future, type `r!getSwitchCode`.");
        msg.channel.send({
          embed: {
            color: 0x86D0CF,
            author: {
              name: msg.author.username + "'s Nintendo Switch Friend Code",
              icon_url: msg.member.user.avatarURL
            },
            description: json.users[userIndex].switchCode,
            footer: {
              text: "Type 'r!help settings' for information about privacy settings."
            }
          }
        });
      } else {
        msg.reply("Your code is not valid. Please make sure your code begins with `SW` and includes dashes.");
      }
    }
  }

  if (msg.content.toLowerCase() == ("r!getswitchcode") || msg.content.toLowerCase() == ("r!switchcode")) {
    if (findUserinJSON(msg) == 0) { // If user is not in database
      addUserToJSON(msg);
    }
    console.log(" - Request to get Nintendo Switch friend code");
    var userIndex = findUserinJSON(msg);
    console.log("  - Switch Code is: " + json.users[userIndex].switchCode);
    if (json.users[userIndex].switchCode != "-1") {
      msg.channel.send({
        embed: {
          color: 0x86D0CF,
          author: {
            name: msg.author.username + "'s Nintendo Switch Friend Code",
            icon_url: msg.member.user.avatarURL
          },
          description: json.users[userIndex].switchCode,
          footer: {
            text: "Type 'r!help settings' for information about privacy settings."
          }
        }
      });
    } else {
      msg.reply("I don't have a Nintendo Switch friend code under your name. Please set one using r!setSwitchCode.");
    }
  }

  if (msg.content.toLowerCase().includes("r!getswitchcode <@") && msg.content.substring(msg.content.length - 1, msg.content.length) == ">") {
    if (findUserinJSON(msg) == 0) { // If user is not in database
      addUserToJSON(msg);
    }
    console.log(" - Request to get Nintendo Switch friend code");
    var extractedID = extractID(msg);
    var mention = "<@" + extractedID + ">";
    if (extractedID != rosalinaID) {
      var userIndex = findIDinJSON(extractedID);
      console.log("  - Switch Code is: " + json.users[userIndex].switchCode);
      console.log("  - User's privacy is: " + json.users[userIndex].switchPrivacy);
      if (json.users[userIndex].switchCode != "-1" && json.users[userIndex].switchPrivacy == "PUBLIC") {
        msg.channel.send({
          embed: {
            color: 0x86D0CF,
            author: {
              name: msg.guild.members.get(extractedID).user.username + "'s Nintendo Switch Friend Code",
              icon_url: msg.guild.members.get(extractedID).user.avatarURL
            },
            description: json.users[userIndex].switchCode
          }
        });
      } else if (json.users[userIndex].switchPrivacy == "PRIVATE") {
        msg.channel.send({
          embed: {
            color: 0x86D0CF,
            author: {
              name: msg.guild.members.get(extractedID).user.username + "'s Nintendo Switch Friend Code",
              icon_url: msg.guild.members.get(extractedID).user.avatarURL
            },
            description: "This code has been kept private",
            footer: {
              text: "Privacy settings can be managed through r!settings"
            }
          }
        });
      } else {
        msg.reply("I don't have a Nintendo Switch friend code for " + mention + ".");
      }
    } else {
      msg.reply("Unfortunately, I cannot give my own friend code.");
    }
  }

  if (msg.content.toLowerCase() == ("r!profile") && false == true) { // Temp disabled
    if (findUserinJSON(msg) == 0) { // If user is not in database
      addUserToJSON(msg);
    }
    var userIndex = findUserinJSON(msg);
    msg.channel.send({
      embed: {
        color: 0x86D0CF,
        author: {
          name: msg.author.username + "'s Profile",
          icon_url: msg.member.user.avatarURL
        },
        fields: [{
            name: "Level",
            value: json.users[userIndex].level
          },
          {
            name: "XP",
            value: json.users[userIndex].exp
          }, {
            name: "Starbits",
            value: json.users[userIndex].starbits
          }
        ]
      }
    });
  }

  if (msg.content.toLowerCase().includes("r!set3dscode") && msg.author.id != rosalinaID) {
    if (findUserinJSON(msg) == 0) { // If user is not in database
      addUserToJSON(msg);
    }
    // TODO: Validate friend code
    console.log(" - Request to set Nintendo 3DS friend code");
    if (msg.content.substring(13) == "") {
      console.log(" - No code detected!");
      msg.reply("Usage: r!set3dsCode YOUR_CODE_HERE");
    } else if (msg.content.substring(13) == "clear") {
      console.log(" - Request for cleared 3DS Code");
      var userIndex = findUserinJSON(msg);
      if (json.users[userIndex].dsCode != "-1") {
        json.users[userIndex].dsCode = "-1"
        writeJSON();
        msg.reply("Your Nintendo 3DS friend code has been removed from my knowledge.");
      } else {
        msg.reply("I don't have a Nintendo 3DS friend code under your name. Please set one using r!set3DSCode.");
      }
    } else {
      if (validatedsCode(msg.content.substring(13))) {
        console.log("  - 3DS Code is: " + msg.content.substring(13));
        var userIndex = findUserinJSON(msg);
        console.log("  - Saved 3DS Code is: " + json.users[userIndex].dsCode);
        json.users[userIndex].dsCode = msg.content.substring(13);
        json.users[userIndex].starbits += 500;
        writeJSON();
        msg.reply("I have saved your Nintendo 3DS friend code. Your current privacy setting for your Nintendo 3DS friend code is " + json.users[userIndex].dsPrivacy);
      } else {
        msg.reply("Your code is not valid. Please make sure your code includes dashes.");
      }
    }
  }

  if (msg.content.toLowerCase() == ("r!get3dscode") || msg.content.toLowerCase() == ("r!3dscode")) {
    if (findUserinJSON(msg) == 0) { // If user is not in database
      addUserToJSON(msg);
    }
    console.log(" - Request to get Nintendo 3DS friend code");
    var userIndex = findUserinJSON(msg);
    console.log("  - 3DS Code is: " + json.users[userIndex].dsCode);
    if (json.users[userIndex].dsCode != "-1") {
      msg.channel.send({
        embed: {
          color: 0x86D0CF,
          author: {
            name: msg.author.username + "'s Nintendo 3DS Friend Code",
            icon_url: msg.member.user.avatarURL
          },
          description: json.users[userIndex].dsCode,
          footer: {
            text: "Type 'r!help settings' for information about privacy settings."
          }
        }
      });
    } else {
      msg.reply("I don't have a Nintendo 3DS friend code under your name. Please set one using r!set3DSCode.");
    }
  }

  if (msg.content.toLowerCase().includes("r!get3dscode <@") && msg.content.substring(msg.content.length - 1, msg.content.length) == ">") {
    if (findUserinJSON(msg) == 0) { // If user is not in database
      addUserToJSON(msg);
    }
    console.log(" - Request to get Nintendo 3DS friend code");
    var extractedID = extractID(msg);
    var mention = "<@" + extractedID + ">";
    console.log("extractedID = " + extractedID + "\nmention = " + mention);
    if (extractedID != rosalinaID) {
      var userIndex = findIDinJSON(extractedID);
      console.log("  - 3DS Code is: " + json.users[userIndex].dsCode);
      if (json.users[userIndex].dsCode != "-1" && json.users[userIndex].dsPrivacy == "PUBLIC") {
        msg.channel.send({
          embed: {
            color: 0x86D0CF,
            author: {
              name: msg.guild.members.get(extractedID).user.username + "'s Nintendo 3DS Friend Code",
              icon_url: msg.guild.members.get(extractedID).user.avatarURL
            },
            description: json.users[userIndex].dsCode
          }
        });
      } else if (json.users[userIndex].dsPrivacy == "PRIVATE") {
        msg.channel.send({
          embed: {
            color: 0x86D0CF,
            author: {
              name: msg.guild.members.get(extractedID).user.username + "'s Nintendo 3DS Friend Code",
              icon_url: msg.guild.members.get(extractedID).user.avatarURL
            },
            description: "This code has been kept private",
            footer: {
              text: "Privacy settings can be managed through r!settings"
            }
          }
        });
      } else {
        msg.reply("I don't have a Nintendo 3DS friend code for " + mention + ".");
      }
    } else {
      msg.reply("Unfortunately, I cannot give my own friend code.");
    }
  }

  if (msg.content.toLowerCase() == "r!build") {
    msg.channel.send("Build: `" + build + "`");
  }

  if (msg.content.toLowerCase() == "r!ping") {
    let start = msg.createdTimestamp;
    console.log("Start: " + start);
    msg.channel.send('Pong')
      .then(message => {
        let diff = (message.createdTimestamp - start);
        message.edit(`Pong \`in ${diff}ms\``);
      })
      .catch(console.error);
  }

  if (msg.content.toLowerCase() == "r!coin") {
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

  if (msg.content.toLowerCase() == "r!dice" || msg.content.toLowerCase() == "r!die") {
    var result = getRandomInt(1, 6);
    msg.reply("Your die landed on `" + result + "`");
  }

  if (msg.content.toLowerCase().includes("r!8ball") && msg.member.id != rosalinaID) {
    if (msg.content.substring(7) != "") {
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
    } else {
      msg.reply("Improper usage. Please ask a yes/no question after the command. For example, `r!8ball Will SSB5 be released next year?`");
    }
  }

  if (msg.content.toLowerCase() == "r!status") {
    msg.channel.send("Bot is currently online and running on " + platform + ".");
    // TODO: Track errors
  }

  if (msg.content.toLowerCase() == "r!dynamo" && false == true) { // DISABLED
    dynamo(msg);
    updateSwitchCodesToAWS();
  }

  if (msg.content.toLowerCase() == "r!embed") {
    msg.channel.send({
      embed: {
        title: "This is an embed",
        color: 0x86D0CF,
        description: "A very simple Embed!",
        footer: {
          text: "Footer"
        }
      }
    });
  }

  if (msg.content.toLowerCase() == "r!github") {
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
        color: 0x86D0CF,
        description: "View the source code, request features, and report bugs.",
      }
    });
  }

  if (msg.content.toLowerCase() == "r!help") {
    // TODO: Add r!coin
    // TODO: \n**Voice** - `shockDodge`
    msg.channel.send("**Command List**\nBasic command structure is `r![command]`. All commands are **not** case-sensitive. Use `r!help [command]` for more information about that command.\n\n**Friend Codes** - `setSwitchCode`, `switchCode`, `set3DSCode`, `3DSCode`\n**Fun** - `coin`, `dice`, `8ball`\n**Debug** - `ping`, `build`, `channel`, `guilds`\n**Misc.** - `settings`, `github`");
    if (msg.author.id == alex) {
      msg.channel.send("**Admin** - `setGame`, `randomGame`, `ip`");
    }
  }

  if (msg.content.toLowerCase().includes("r!help ") && msg.author.id != rosalinaID) {
    switch (msg.content.toLowerCase().substring(7)) {
      case "setswitchcode":
        msg.channel.send("**r!setSwitchCode**\nKeeps your Nintendo Switch Friend Code stored for reference and sharing\n\n*Usage Examples*\n`r!setSwitchCode SW-YOUR_CODE_HERE` Sets your Nintendo Switch code (include dashes)\n`r!setSwitchCode clear` Your Nintendo Switch code will be removed from the database");
        break;
      case "getswitchcode":
        msg.channel.send("**r!switchCode**\nShares your Nintendo Switch Friend Code with your channel\n\n*Usage Examples*\n`r!getSwitchCode` Gets sender's Nintendo Switch code\n`r!getSwitchCode @USER` Gets mentioned users' Nintendo Switch code");
        break;
      case "set3dscode":
        msg.channel.send("**r!set3DSCode**\nKeeps your Nintendo 3DS Friend Code stored for reference and sharing\n\n*Usage Examples*\n`r!set3DSCode YOUR_CODE_HERE` Sets your Nintendo 3DS code (include dashes)\n`r!set3DSCode clear` Your Nintendo 3DS code will be removed from the database");
        break;
      case "get3dscode":
        msg.channel.send("**r!3DSCode**\nShares your Nintendo 3DS Friend Code with your channel\n\n*Usage Examples*\n`r!get3DSCode` Gets sender's Nintendo 3DS code\n`r!get3DSCode @USER` Gets mentioned users' Nintendo 3DS code");
        break;
      case "build":
        msg.channel.send("**r!build**\nReturns RosalinaBot's build number");
        break;
      case "channel":
        msg.channel.send("**r!channel**\nReturns the current channel name and ID");
        break;
      case "settings":
        msg.channel.send("**r!settings**\nLists your current settings\n\n*Usage Examples*\n`r!settings switchCode PUBLIC` Sets the sender's privacy settings for their Nintendo Switch friend code.\n\n*Format*\n`r!settings [platform]Code [PRIVACY]`\n\n*Arguments*\n**platform** - `3DS`, `Switch`\n**privacy** - `PUBLIC`, `PRIVATE`");
        break;
      case "ping":
        msg.channel.send("**r!ping**\nReturns the response time, or ping, of a message");
        break;
      case "coin":
        msg.channel.send("**r!coin**\nFlips a coin. Can land on heads, tails, or its side.");
        break;
      case "dice":
        msg.channel.send("**r!dice**\nTosses a six-sided die. Can also be executed with `r!die`.");
        break;
      case "8ball":
        msg.channel.send("**r!8ball**\nAsk a yes/no question after this command and recieve an answer from the stars (Reliability of answers may vary)");
        break;
      case "shockdodge":
        msg.channel.send("**r!shockDodge**\nJoins your current voice channel and plays the shock dodge clip. Disconnects from your voice channel when you leave.\n*Context*\nhttps://youtu.be/SpzqGmXypQ0?t=1m4s");
        break;
      case "guilds":
        msg.channel.send("**r!guilds**\nReturns the amount of guilds, or servers, that RosalinaBot serves.");
        break;
      case "github":
        msg.channel.send("**r!github**\nView the source code, request features, and report bugs.");
        break;
      default:
        msg.reply("That command is not in the help database.");
        break;
    }
  }

  if (msg.content.toLowerCase().includes("r!settings") && msg.author.id != rosalinaID) {
    if (findUserinJSON(msg) == 0) { // If user is not in database
      addUserToJSON(msg);
    }
    switch (msg.content.toLowerCase().substring(11)) {
      case "switchcode public":
        var userIndex = findUserinJSON(msg);
        console.log("Current privacy setting: " + json.users[userIndex].switchPrivacy);
        if (json.users[userIndex].switchPrivacy != "PUBLIC") {
          json.users[userIndex].switchPrivacy = "PUBLIC";
          writeJSON();
          msg.reply("Your Nintendo Switch friend code is now viewable to anyone who requests it.");
        } else {
          msg.reply("Your Nintendo Switch friend code is already public.");
        }
        break;
      case "switchcode private":
        var userIndex = findUserinJSON(msg);
        console.log("Current privacy setting: " + json.users[userIndex].switchPrivacy);
        if (json.users[userIndex].switchPrivacy != "PRIVATE") {
          json.users[userIndex].switchPrivacy = "PRIVATE";
          writeJSON();
          msg.reply("Your Nintendo Switch friend code can now only be viewed if you use `r!getSwitchCode` on yourself.");
        } else {
          msg.reply("Your Nintendo Switch friend code is already private.");
        }
        break;
      case "3dscode public":
        var userIndex = findUserinJSON(msg);
        console.log("Current privacy setting: " + json.users[userIndex].dsPrivacy);
        if (json.users[userIndex].dsPrivacy != "PUBLIC") {
          json.users[userIndex].dsPrivacy = "PUBLIC";
          writeJSON();
          msg.reply("Your Nintendo 3DS friend code is now viewable to anyone who requests it.");
        } else {
          msg.reply("Your Nintendo 3DS friend code is already public.");
        }
        break;
      case "3dscode private":
        var userIndex = findUserinJSON(msg);
        console.log("Current privacy setting: " + json.users[userIndex].dsPrivacy);
        if (json.users[userIndex].dsPrivacy != "PRIVATE") {
          json.users[userIndex].dsPrivacy = "PRIVATE";
          writeJSON();
          msg.reply("Your Nintendo 3DS friend code can now only be viewed if you use `r!get3DSCode` on yourself.");
        } else {
          msg.reply("Your Nintendo 3DS friend code is already private.");
        }
        break;
      case "":
        var userIndex = findUserinJSON(msg);
        msg.channel.send({
          embed: {
            color: 0x86D0CF,
            author: {
              name: "Settings for " + msg.author.username,
              icon_url: msg.member.user.avatarURL
            },
            fields: [{
                name: "*Nintendo 3DS Friend Code Privacy Setting*",
                value: json.users[userIndex].dsPrivacy
              },
              {
                name: "*Nintendo Switch Friend Code Privacy Setting*",
                value: json.users[userIndex].switchPrivacy
              }
            ],
            footer: {
              text: "Type 'r!help settings' for information about changing these settings."
            }
          }
        });
        break;
      default:
        msg.reply("Your command was ill-formed.\n**r!settings**\nLists your current settings\n\n*Usage Examples*\n`r!settings switchCode PUBLIC` Sets the sender's privacy settings for their Nintendo Switch friend code.\n\n*Format*\n`r!settings [platform]Code [PRIVACY]`\n\n*Arguments*\n**platform** - `3DS`, `Switch`\n**privacy** - `PUBLIC`, `PRIVATE`");
        break;
    }
  }

  if (msg.content.toLowerCase().includes("r!extractid ")) {
    msg.channel.send("Extracted: " + extractID(msg));
  }

  if (msg.content.toLowerCase().includes("r!setgame ") && msg.author.id == alex) {
    setGame(msg.content.substring(10));
    msg.channel.send("Set current game to: \`" + msg.content.substring(10) + "\`");
  } else if (msg.content.toLowerCase().includes("r!setgame ") && msg.author.id != alex) { // Redundant
    msg.reply("You do not have permission to use this command.");
  }
});

client.login(config.TOKEN);

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomGame() {
  var game = "";
  switch (getRandomInt(0, 4)) {
    case 0:
      game = "Super Mario Galaxy";
      break;
    case 1:
      game = "Super Mario Galaxy 2";
      break;
    case 2:
      game = "Super Mario 3D World";
      break;
    case 3:
      game = "Super Smash Bros. for Wii U";
      break;
    case 4:
      game = "Mario Kart 8 Deluxe";
      break;
    default:
      game = "Super Mario Galaxy";
      console.log("Hit Default");
      break;
  }
  console.log("Set current game to " + game);
  client.user.setPresence({
    status: 'online',
    afk: false,
    game: {
      name: game,
      url: "https://www.nintendo.com"
    }
  });
  return game;
}

function setGame(game) {
  console.log("Set current game to " + game);
  client.user.setPresence({
    status: 'online',
    afk: false,
    game: {
      name: game,
      url: "https://www.nintendo.com"
    }
  });
}

function printJSON() {
  for (i = 1; i < length; i++) {
    console.log(json.users[i].userID);
  }
}

function addUserToJSON(msg) {
  console.log(" - Adding user to database");
  if (msg.channel.type == 'dm') {
    // Don't add to server list
  }
  json = JSON.parse(jsonText);
  json['users'].push({
    "userID": msg.author.id,
    "switchCode": "-1",
    "dsCode": "-1",
    "switchPrivacy": "PRIVATE",
    "dsPrivacy": "PRIVATE",
    "starbits": 0,
    "exp": 0,
    "level": 1
  });
  jsonText = JSON.stringify(json);
  length = json['users'].length;
  // TODO: Greet users
  fs.writeFile("database.json", JSON.stringify(json), "utf8");
}

function findUserinJSON(msg) {
  // console.log(" - Finding user in JSON");
  var index = 0;
  for (i = 0; i < length; i++) {
    // console.log("  - Comparing " + json.users[i].userID + " to " + msg.author.id);
    if (json.users[i].userID == msg.author.id) {
      index = i;
      // console.log(" - Found user in JSON");
      break;
    }
  }
  if (index == 0) {
    // console.log(" - Could not find user in JSON");
  }
  return index;
}

function findIDinJSON(id) {
  // console.log(" - Finding user in JSON");
  var index = 0;
  for (i = 0; i < length; i++) {
    // console.log("  - Comparing " + json.users[i].userID + " to " + msg.author.id);
    if (json.users[i].userID == id) {
      index = i;
      // console.log(" - Found user in JSON");
      break;
    }
  }
  if (index == 0) {
    // console.log(" - Could not find user in JSON");
  }
  return index;
}

function readJSON() {
  fs.exists("./database.json", function(exists) {
    if (exists) {
      fs.readFile("./database.json", "utf8", function(err, data) {
        if (err) {
          console.log(err);
        }
        initObj(data);
      })
    } else {
      console.log("Database doesn't exist!");
      writeJSON();
    }
  });
}

function writeJSON() {
  fs.writeFile("database.json", JSON.stringify(json), "utf8");
}

function initObj(data) {
  jsonText = data;
  json = JSON.parse(jsonText);
  length = json['users'].length;
}

function validateSwitchCode(code) {
  // Example code: SW-XXXX-XXXX-XXXX
  if (code.substring(0, 3) == "SW-") {
    if (code.length == 17) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}

function validatedsCode(code) {
  // Example code: XXXX-XXXX-XXXX
  if (code.substring(0, 3) != "SW-") {
    if (code.length == 14) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}

function extractID(msg) {
  var text = msg.content.toLowerCase();
  var startIndex = -1;
  var endIndex = -1;
  var result = "";
  console.log(" - Extracting ID");
  for (i = 0; i < text.length; i++) {
    if (text.substring(i, i + 2) == "<@") {
      if (text.substring(i + 2, i + 3) == "!") {
        startIndex = i + 3;
      } else {
        startIndex = i + 2;
      }
    }
    if (text.substring(i, i + 1) == ">") {
      endIndex = i;
    }
  }
  if (startIndex != -1 && endIndex != -1) {
    result = text.substring(startIndex, endIndex);
    console.log(" - Extracted: " + result);
    return result;
  } else {
    return "ID Extraction Failed!"
  }
}

function updateGuildsToAWS() {
  var params = {
    MetricData: [{
      MetricName: 'Guilds Serving',
      Dimensions: [{
        Name: 'Statistics',
        Value: 'Guilds'
      }, ],
      Unit: 'None',
      Value: client.guilds.size
    }, ],
    Namespace: 'RosalinaBot'
  };

  cw.putMetricData(params, function(err, data) {
    if (err) {
      console.log("Error", err);
    } else {
      // console.log("Success", data);
    }
  });
}

function updateSwitchCodesToAWS() {
  readJSON();
  var codesManaged = 0;
  var priv = 0;
  var publ = 0;
  for (i = 0; i < json.users[i].length; i++) {
    console.log(i);
    if (json.users[i].switchCode != "-1") {
      codesManaged++;
      console.log(codesManaged);
      if (json.users[i].switchPrivacy != "PUBLIC") {
        publ++;
      } else {
        priv++;
      }
    }
  }

  var params = {
    MetricData: [{
      MetricName: 'Nintendo Switch Codes Managed',
      Dimensions: [{
        Name: 'Statistics',
        Value: 'Codes'
      }, ],
      Unit: 'None',
      Value: codesManaged
    }, ],
    Namespace: 'RosalinaBot'
  };

  cw.putMetricData(params, function(err, data) {
    if (err) {
      console.log("Error", err);
    } else {}
  });

  var params = {
    MetricData: [{
      MetricName: 'Public Nintendo Switch Codes',
      Dimensions: [{
        Name: 'Statistics',
        Value: 'Codes'
      }, ],
      Unit: 'None',
      Value: publ
    }, ],
    Namespace: 'RosalinaBot'
  };

  cw.putMetricData(params, function(err, data) {
    if (err) {
      console.log("Error", err);
    } else {}
  });

  var params = {
    MetricData: [{
      MetricName: 'Private Nintendo Switch Codes',
      Dimensions: [{
        Name: 'Statistics',
        Value: 'Codes'
      }, ],
      Unit: 'None',
      Value: priv
    }, ],
    Namespace: 'RosalinaBot'
  };

  cw.putMetricData(params, function(err, data) {
    if (err) {
      console.log("Error", err);
    } else {}
  });
}

function dynamo(msg) {
  if (true == false) {
    var fails = 0;
    var succeed = 0;
    readJSON();
    for (i = 0; i < length; i++) {
      var params = {
        TableName: "RosalinaBotTable",
        Item: {
          "userID": json.users[i].userID,
          "switchCode": json.users[i].switchCode,
          "switchPrivacy": json.users[i].switchPrivacy,
          "dsCode": json.users[i].dsCode,
          "dsPrivacy": json.users[i].dsPrivacy,
          "starbits": json.users[i].starbits,
          "exp": json.users[i].exp,
          "level": json.users[i].level
        }
      };

      docClient.put(params, function(err, data) {
        if (err) {
          console.error("Unable to add json", ". Error JSON:", JSON.stringify(err, null, 2));
          fails++;
        } else {
          succeed++;
        }
      });
    }
    msg.reply("Put to DynamoDB with " + succeed + " successes and " + fails + " fails.");
  }
}
