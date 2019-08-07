const Discord = require("discord.js");
const client = new Discord.Client();

var config = require('./config.json');
var npm = require('./package.json');

const luma = "<:luma:463841535377539082>";

// Classes
const Help = require('./commands/Help.js');
const EightBall = require('./commands/EightBall.js');
const Dice = require('./commands/Dice.js');
const Ping = require('./commands/Ping.js');
const Coin = require('./commands/Coin.js');
const Profile = require('./commands/Profile.js');
const SwitchCode = require('./commands/SwitchCode.js');
const DSCode = require('./commands/DSCode.js');
const PSN = require('./commands/PSN.js');
const PoGoCode = require('./commands/PoGoCode.js');
const Settings = require('./commands/Settings.js');
const MarioMaker = require('./commands/MarioMaker.js');
const FireEmblemHeroes = require('./commands/FireEmblemHeroes.js');
const SuperMarioOdyssey = require('./commands/SuperMarioOdyssey.js');
const Status = require('./commands/Status.js');
const Welcome = require('./commands/Welcome.js');
const Suggest = require('./comet_observatory/Suggest.js');
const Arena = require('./commands/Arena.js');
const ServerInfo = require('./commands/ServerInfo.js');
const Bug = require('./comet_observatory/Bug.js');
const Changelog = require('./commands/Changelog.js');
const DeleteUser = require('./commands/DeleteUser.js');
const UpdateGuilds = require('./cloudwatch/UpdateGuilds.js');
const Update3DSCodes = require('./cloudwatch/Update3DSCodes.js');
const UpdatePoGoCodes = require('./cloudwatch/UpdatePoGoCodes.js');
const UpdateSwitchCodes = require('./cloudwatch/UpdateSwitchCodes.js');
const UpdateBalloonCodes = require('./cloudwatch/UpdateBalloonCodes.js');
const UpdateServerMembers = require('./cloudwatch/UpdateServerMembers.js');
const NintendoDirect = require('./comet_observatory/NintendoDirect.js');
const TriggerDirect = require('./commands/TriggerDirect.js');
const Echo = require('./commands/Echo.js');
const EchoDelete = require('./commands/EchoDelete.js');
const Roles = require('./comet_observatory/Roles.js');
const PostToDB = require('./cloudwatch/PostToDB.js');
const PostToDBL = require('./cloudwatch/PostToDBL.js');
const Logger = require('./utils/Logger.js');
// const PartnerServers = require('./comet_observatory/PartnerServers.js');

const build = npm.version;
const prefix = "r!";
const color = 0x86D0CF;

client.on('ready', () => {
    new Logger("Client is ready");
    switch (client.user.username) {
        case "Rosalina":
            new Logger("Logged in as \x1b[34mRosalina\x1b[0m")
            break;
        case "Peach":
            new Logger("Logged in as \x1b[35mPeach\x1b[0m");
            break;
        case "Daisy":
            new Logger("Logged in as \x1b[33mDaisy\x1b[0m");
            break;
        case "Pauline":
            new Logger("Logged in as \x1b[31mPauline\x1b[0m");
            break;
        default:
            new Logger("Logged in as " + client.user.username);
    }
    new Logger(`Build ${build}`);
    new Logger("Running on " + process.env.PLATFORM + " with Node " + process.env.NODE_VERSION);
    new Logger("Currently in " + client.guilds.size + " servers")
    new Logger("All timestamps are in the timezone of " + process.env.TIMEZONE)
    client.user.setPresence({
        status: 'online',
        afk: false,
        game: {
            name: "r!help for commands"
        }
    });
    if (client.user.id == config.CLIENT_ID) { // Client must be actual live bot for this block
        new Logger("This instance is a live bot")
        new UpdateGuilds(client.guilds.size);
        new Update3DSCodes();
        new UpdateSwitchCodes();
        new UpdateBalloonCodes();
        new UpdatePoGoCodes();
        new NintendoDirect(client);
        new PostToDB(client);
        const DBL = require("dblapi.js");
        const dbl = new DBL(config.DBL_TOKEN, client); // Requires Node 7.6 or later
        // new PostToDBL(client);
        if (client.guilds.get(config.COMET_OBSERVATORY_ID).available) {
            new UpdateServerMembers(client.guilds.get(config.COMET_OBSERVATORY_ID).memberCount);
        }

        client.channels.get(config.rosalinaBotTestChannel).send({
            embed: {
                title: "Client Restarted!",
                color: color,
                fields: [{
                    name: "Build",
                    value: build,
                    inline: true
                }, {
                    name: "Guilds Serving",
                    value: client.guilds.size,
                    inline: true
                }
                ],
                footer: {
                    text: "This message was automatically generated because an instance of RosalinaBot was started. This message is intended for development and debugging purposes and should only appear in a specific server."
                }
            }
        });
    } else if (process.env.USER == "travis") { // Travis-CI
        console.log("Compilation successful! Exiting with code 0.");
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
                    url: "https://github.com/alexsmbaratti/RosalinaBot/",
                    color: color,
                    description: "View the source code, request features, and report bugs.",
                }
            });
        } else if (input.startsWith("dice") || input.startsWith("die")) {
            new Dice(msg);
        } else if (input == "ping") {
            new Ping(msg);
        } else if (input.startsWith("echod ")) {
            new EchoDelete(msg);
        } else if (input.startsWith("role")) {
            new Roles(msg);
        } else if (input.startsWith("echo ")) {
            new Echo(msg);
        } else if (input == "coin" || input == "c") {
            new Coin(msg);
        } else if (input == "build" || input == "version") {
            msg.channel.send("Build: `" + build + "`");
        } else if (input == "guilds") {
            msg.channel.send("I am currently serving `" + client.guilds.size + "` guilds.");
            new UpdateGuilds(client.guilds.size);
        } else if (input.startsWith("switchcode") || input.startsWith("sc")) {
            new SwitchCode(msg);
            new UpdateSwitchCodes();
        } else if (input.startsWith("3dscode") || input.startsWith("dscode") || input.startsWith("ds")) {
            new DSCode(msg);
            new Update3DSCodes();
        } else if (input.startsWith("pogocode")) {
            new PoGoCode(msg);
            new UpdatePoGoCodes();
        } else if (input.startsWith("getswitchcode") || input.startsWith("setswitchcode")) {
            msg.channel.send(":x: " + msg.content.split("!")[1] + " is deprecated! Please use `r!switchCode` instead.");
        } else if (input.startsWith("getdscode") || input.startsWith("setdscode") || input.startsWith("get3dscode") || input.startsWith("set3dscode")) {
            msg.channel.send(":x: " + msg.content.split("!")[1] + " is deprecated! Please use `r!3DSCode` instead.");
        } else if (input.startsWith("settings")) {
            new Settings(msg);
            // msg.channel.send(":x: The `r!settings` command has been temporarily disabled. <:ohno_rosalina:517899671608229899>");
        } else if (input.startsWith("smm")) {
            new MarioMaker(msg);
        } else if (input.startsWith("ssbu")) {
            new Arena(msg);
        } else if (input.startsWith("donate")) {
            msg.channel.send({
                embed: {
                    author: {
                        name: "Donate"
                    },
                    title: "Support the Development of RosalinaBot",
                    url: "https://donatebot.io/checkout/424020073712189471?buyer=212031489053818880",
                    color: color
                }
            });
        } else if (input.startsWith("changelog")) {
            new Changelog(msg);
        } else if (input.startsWith("smo") || input.startsWith("balloon") || input.startsWith("balloonworld")) {
            new SuperMarioOdyssey(msg);
            new UpdateBalloonCodes();
        } else if (input.startsWith("vote")) {
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
        } else if (input.startsWith("invite")) {
            msg.channel.send({
                embed: {
                    title: "Invite Link",
                    url: "https://discordapp.com/oauth2/authorize?client_id=322405544490958849&scope=bot&permissions=0",
                    color: color,
                    description: "To invite RosalinaBot to another server, use this link."
                }
            });
        } else if (input.startsWith("status")) {
            new Status(msg, build, client);
        } else if (input.startsWith("direct")) {
            new TriggerDirect(client, msg);
        } else if (input.startsWith("profile")) {
            new Profile(msg);
        } else if (input.startsWith("welcome")) {
            new Welcome(msg);
        } else if (input.startsWith("suggest")) {
            new Suggest(msg, client);
        } else if (input.startsWith("bug")) {
            new Bug(msg, client);
        } else if (input.startsWith("partner")) {
            // new PartnerServers(msg, client);
        } else if (input.startsWith("serverinfo")) {
            new ServerInfo(msg);
        } else if (input.startsWith("support") || input.startsWith("server")) {
            msg.channel.send("https://discord.gg/kpFHWAq");
        } else if (msg.author.id == config.alexsmbaratti) { // Alpha Testing
            if (input.startsWith("feh")) {
                new FireEmblemHeroes(msg);
            } else if (input.startsWith("psn")) {
                new PSN(msg);
            } else if (input == "clear") {
                new DeleteUser(msg);
            }
        }
    } else if (msg.content.startsWith("Let's be friends in Pokémon GO! My Trainer Code is ")) {
        new PoGoCode(msg);
        new UpdatePoGoCodes();
    }
});

client.on('guildCreate', guild => {
    new Logger(`Guild Create Triggered`);
    if (client.user.id == config.CLIENT_ID && guild.available) {
        var id = guild.id;
        try {
            const DBL = require("dblapi.js");
            const dbl = new DBL(config.DBL_TOKEN, client); // Requires Node 7.6 or later
            updateNickname(newGuild);
        } catch (e) {
            // If there is no default channel
        } finally {
            new UpdateGuilds(client.guilds.size);
            new PostToDB(client);

            // const MongoClient = require('mongodb').MongoClient;
            // const url = 'mongodb://localhost:27017';
            // MongoClient.connect(url, function(err, client) {
            //   var db = client.db('bot');
            //   db.collection('guilds').insertOne({
            //     _id: id,
            //     announcement_channel: null,
            //     prefix: "r!"
            //   }, function(err, res) {
            //     if (err) {
            //       console.log(err);
            //       client.close();
            //     } else {
            //       console.log(res);
            //       client.close();
            //     }
            //   });
            // })
        }
    }
});

client.on('guildDelete', guild => {
    new Logger(`Guild Delete Triggered`);
    new UpdateGuilds(client.guilds.size);
    const DBL = require("dblapi.js");
    const dbl = new DBL(config.DBL_TOKEN, client); // Requires Node 7.6 or later
});

client.on('guildUpdate', (oldGuild, newGuild) => {
    new Logger(`Guild Update Triggered`);
    updateNickname(newGuild);
});

client.on('guildMemberAdd', member => {
    if (member.guild.id == config.COMET_OBSERVATORY_ID) {
        if (!(member.user.username.includes("discord.gg/"))) {
            var ran = Math.floor(Math.random() * (3 - 1 + 1)) + 1;
            var welcomeMsg;
            switch (ran) {
                case 1:
                    welcomeMsg = "Welcome, " + member.user.username + ", to the Comet Observatory! <:luma:463841535377539082>";
                    break;
                case 2:
                    welcomeMsg = "Everyone welcome " + member.user.username + " to the Comet Observatory! <:luma:463841535377539082>";
                    break;
                case 3:
                    welcomeMsg = member.user.username + " has joined! Welcome! <:luma:463841535377539082>";
                    break;
                default:
                    welcomeMsg = "Welcome, " + member.user.username + ", to the Comet Observatory! <:luma:463841535377539082>";
            }
            client.channels.get(config.COMET_OBSERVATORY_WELCOME).send(welcomeMsg);
            member.addRole('526848849247993867')
                .catch(console.error);
        }
    }
});

client.on('guildMemberRemove', member => {
    if (member.guild.id == config.COMET_OBSERVATORY_ID) {
        if (!(member.user.username.includes("discord.gg/"))) {
            var ran = Math.floor(Math.random() * (2 - 1 + 1)) + 1;
            var byeMsg;
            switch (ran) {
                case 1:
                    byeMsg = member.user.username + " has left the server.";
                    break;
                case 2:
                    byeMsg = "Goodbye " + member.user.username + "!";
                    break;
                default:
                    byeMsg = member.user.username + " has left the server.";
            }
            client.channels.get(config.COMET_OBSERVATORY_WELCOME).send(byeMsg);
        }
    }
});

function updateNickname(guild) {
    if (client.user.id == config.CLIENT_ID) { // Client must be actual live bot for this block
        switch (guild.region) {
            case "japan":
                guild.me.setNickname("ロゼッタ")
                    .catch(console.error);
                break;
            case "russia":
                guild.me.setNickname("Розалина")
                    .catch(console.error);
                break;
            default:
                guild.me.setNickname("Rosalina")
                    .catch(console.error);
        }
    }
}

if (process.env.TOKEN != undefined) {
    client.login(process.env.TOKEN);
} else {
    client.login(config.TOKEN);
}
