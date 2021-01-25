const utils = require('./utils');

module.exports.handle = function (interaction, channel, user) {
    let arenaID = utils.getOption(interaction.data.options, 'id');
    let arenaPassword = utils.getOption(interaction.data.options, 'password');

    if (arenaID == null) {
        arenaID = "Friends Only";
    } else {
        if (arenaID.value.length == 5) {
            arenaID = arenaID.value;
        } else {
            channel.send({
                embed: {
                    color: 0x86D0CF,
                    title: "Could not share Battle Arena!",
                    description: "You did not enter a valid Arena ID"
                }
            });
            return;
        }
    }

    if (arenaPassword == null) {
        arenaPassword = "No Password";
    } else {
        if (arenaPassword.value.length == 4 && !isNaN(arenaPassword.value)) {
            arenaPassword = arenaPassword.value;
        } else {
            channel.send({
                embed: {
                    color: 0x86D0CF,
                    title: "Could not share Battle Arena!",
                    description: "You did not enter a valid password"
                }
            });
            return;
        }
    }

    channel.send({
        embed: {
            author: {
                name: user.username + " wants to battle!",
                icon_url: user.avatarURL({dynamic: true})
            },
            color: 0x86D0CF,
            title: "**Super Smash Bros. Ultimate Battle Arena**",
            fields: [{
                name: "Arena ID",
                value: arenaID,
                inline: true
            },
                {
                    name: "Password",
                    value: arenaPassword,
                    inline: true
                }
            ],
            thumbnail: {
                url: "https://raw.githubusercontent.com/alexsmbaratti/RosalinaBot/indev/misc/smash_emblem_white.png"
            },
            footer: {
                text: "Requires an active Nintendo Switch Online subscription to join"
            }
        }
    });
}
