const utils = require('./utils');

module.exports.handle = function (interaction, driver, channel, user) {
    let switchCode = utils.getOption(interaction.data.options, 'switchcode').value;
    if (validateCode(switchCode)) {
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
    } else {
        channel.send({
            embed: {
                color: 0x86D0CF,
                author: {
                    name: user.username,
                    icon_url: user.avatarURL({dynamic: true})
                },
                title: "Could not save Nintendo Switch Friend Code!",
                description: "You did not enter a valid Nintendo Switch Friend Code.",
                footer: {
                    text: "Valid Nintendo Switch Friend Codes look like SW-XXXX-XXXX-XXXX"
                }
            }
        });
    }
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