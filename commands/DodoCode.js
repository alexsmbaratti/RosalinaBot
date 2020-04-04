const Command = require('../commands/Command.js');
const color = 0x86D0CF;

// r!acnh DODOCODE

class DodoCode extends Command {
    constructor(msg) {
        super(msg);
        var arg1;
        var arg2;
        var name;
        try {
            arg1 = msg.content.split(" ")[1].toUpperCase();
        } catch (e) {
            arg1 = "";
        }
        try {
            arg2 = msg.content.split(" ")[2].toUpperCase();
            switch (arg2.toLowerCase()) {
                case "🍐":
                case "pear":
                case "pears":
                    arg2 = "Pears 🍐";
                    break;
                case "🍎":
                case "a":
                case "apple":
                case "apples":
                    arg2 = "Apples 🍎";
                    break;
                case "🍑":
                case "peach":
                case "peachs":
                case "peaches":
                    arg2 = "Peaches 🍑";
                    break;
                case "🍊":
                case "orange":
                case "oranges":
                case "o":
                    arg2 = "Oranges 🍊";
                    break;
                case "c":
                case "🍒":
                case "cherry":
                case "cherrys":
                case "cherries":
                    arg2 = "Cherries 🍒";
                    break;
                default:
                    arg2 = "NONE";
            }
        } catch (e) {
            arg2 = "NONE";
        }

        try {
            name = msg.member.displayName;
        } catch (e) {
            name = msg.author.username;
        }

        if (arg1 == "") { // No arguments given
            msg.channel.send(":x: Invalid usage!\nCorrect usage is: `r!acnh [DODOCODE]`.")
        } else { // First argument given
            if (arg1.length == 5) { // Valid ID
                if (arg2 == "NONE") {
                    msg.channel.send({
                        embed: {
                            author: {
                                name: name + " is inviting you to their island!",
                                icon_url: msg.author.avatarURL
                            },
                            color: color,
                            title: "**Animal Crossing New Horizons**",
                            fields: [{
                                name: "Dodo Code",
                                value: arg1,
                                inline: true
                            }
                            ],
                            thumbnail: {
                                url: "https://raw.githubusercontent.com/alexsmbaratti/RosalinaBot/indev/misc/ac_emblem_white.png"
                            },
                            footer: {
                                text: "Requires an active Nintendo Switch Online subscription to join"
                            }
                        }
                    }).then(message => {
                        msg.delete();
                    }).catch(console.error);
                } else {
                    msg.channel.send({
                        embed: {
                            author: {
                                name: name + " is inviting you to their island!",
                                icon_url: msg.author.avatarURL
                            },
                            color: color,
                            title: "**Animal Crossing New Horizons**",
                            fields: [{
                                name: "Dodo Code",
                                value: arg1,
                                inline: true
                            }, {
                                name: "Native Fruit",
                                value: arg2,
                                inline: true
                            }
                            ],
                            thumbnail: {
                                url: "https://raw.githubusercontent.com/alexsmbaratti/RosalinaBot/indev/misc/ac_emblem_white.png"
                            },
                            footer: {
                                text: "Requires an active Nintendo Switch Online subscription to join"
                            }
                        }
                    }).then(message => {
                        msg.delete();
                    }).catch(console.error);
                }
            } else { // ID not valid
                msg.channel.send(":x: Dodo Code was invalid.")
            }
        }
    }
}

module.exports = DodoCode;