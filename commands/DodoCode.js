const Command = require('../commands/Command.js');
const color = 0x86D0CF;

// r!acnh DODOCODE

class DodoCode extends Command {
    constructor(msg) {
        super(msg);
        var arg1;
        var name;
        try {
            arg1 = msg.content.split(" ")[1].toUpperCase();
        } catch (e) {
            arg1 = "";
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
            } else { // ID not valid
                msg.channel.send(":x: Dodo Code was invalid.")
            }
        }
    }
}

module.exports = DodoCode;
