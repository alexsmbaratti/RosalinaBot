const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("../config.json");
const BotDBDriver = require('../models/BotDBDriver');
var driver;

client.ws.on('INTERACTION_CREATE', async interaction => {
    let guild = client.guilds.cache.get(interaction.guild_id);
    if (guild.available) {
        let channel = client.channels.cache.get(interaction.channel_id);
        client.users.fetch(interaction.member.user.id).then(user => {
            switch (interaction.data.name.toLowerCase()) {
                case 'switchcode':
                    let mentionedUser = getOption(interaction.data.options, 'user');
                    if (mentionedUser == null) { // User has requested their own code
                        driver.getUser(interaction.member.user.id).then(res => {
                            channel.send({
                                embed: {
                                    color: 0x86D0CF,
                                    author: {
                                        name: user.username,
                                        icon_url: user.avatarURL({dynamic: true})
                                    },
                                    title: "Nintendo Switch Friend Code",
                                    description: res.switchCode,
                                    footer: {
                                        text: "Requested by " + user.tag
                                    }
                                }
                            });
                        }).catch(err => {
                            console.log(err);
                        });
                    } else { // User has requested the code of the mention
                        mentionedUser = mentionedUser.value;
                        client.users.fetch(mentionedUser).then(newUser => {
                            driver.getUser(mentionedUser).then(res => {
                                channel.send({
                                    embed: {
                                        color: 0x86D0CF,
                                        author: {
                                            name: newUser.username,
                                            icon_url: newUser.avatarURL({dynamic: true})
                                        },
                                        title: "Nintendo Switch Friend Code",
                                        description: res.switchCode,
                                        footer: {
                                            text: "Requested by " + user.tag
                                        }
                                    }
                                });
                            }).catch(err => {
                                console.log(err);
                            });
                        });
                    }
                    break;
                case 'setswitchcode':
                    let switchCode = getOption(interaction.data.options, 'switchcode').value;
                    if (switchCode != null && validateCode(switchCode)) {
                        driver.updateUser(interaction.member.user.id, {switchCode: switchCode}).then(res => {
                            channel.send({
                                embed: {
                                    color: 0x86D0CF,
                                    author: {
                                        name: user.username,
                                        icon_url: user.avatarURL({dynamic: true})
                                    },
                                    title: "Nintendo Switch Friend Code Saved!",
                                    description: switchCode,
                                    footer: {
                                        text: "Use /switchcode to share your code"
                                    }
                                }
                            });
                        }).catch(err => {
                            console.log(err);
                        });
                    }
                    break;
                default:
                // Do nothing
            }
        });
    }
});

client.on('message', msg => {
    if (msg.content.toLowerCase().startsWith('r!') && msg.author.bot != true) {
        var input = msg.content.toLowerCase().split('r!')[1].split(' ')[0];
        switch (input) {
            case 'help':
            case '8ball':
            case 'github':
            case 'die':
            case 'dice':
            case 'ping':
            case 'echo':
            case 'echod':
            case 'coin':
            case 'c':
            case 'build':
            case 'switchcode':
            case 'sc':
            case '3dscode':
            case 'dscode':
            case 'ds':
            case 'pogocode':
            case 'ssbu':
            case 'acnh':
            case 'anch':
            case 'privacy':
            case 'invite':
            case 'serverinfo':
            case 'clear':
            case 'support':
            case 'settings':
            case 'direct':
            case 'vote':
                msg.channel.send({
                    embed: {
                        title: "We've Moved to Slash Commands!",
                        url: "https://discord.com/oauth2/authorize?client_id=322405544490958849&permissions=17408&scope=applications.commands%20bot",
                        color: 0x86D0CF,
                        description: "To provide a better experience with less downtime, RosalinaBot is switching over to slash commands. To facilitate this, a new permission is required for your server. If RosalinaBot's slash commands do not appear when you type `/`, please ask a moderator or admin to reauthorize this bot with [this link](https://discord.com/oauth2/authorize?client_id=322405544490958849&permissions=17408&scope=applications.commands%20bot). To learn more about Discord Slash Commands, [click here](https://discord.com/oauth2/authorize?client_id=322405544490958849&permissions=17408&scope=applications.commands%20bot).",
                        footer: {
                            text: "Normal commands will be fully deprecated on February 28, 2021."
                        }
                    }
                });
        }
    }
});

client.on('ready', () => {
    console.log('Shard in ready state');
    driver = new BotDBDriver(config.db.uri, config.db.dbName);

    client.options.messageCacheLifetime = 30;
    client.options.messageSweepInterval = 45;
});

client.login(config.botToken).then(r => console.log('Shard logged in'));

function getOption(options, name) {
    try {
        for (let i = 0; i < options.length; i++) {
            if (options[i].name == name) {
                return options[i];
            }
        }
    } catch (e) {
        return null;
    }
    return null;
}

function validateCode(code) {
    if (code.substring(0, 3).toLowerCase() == "sw-") {
        if (code.length == 17) {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
}