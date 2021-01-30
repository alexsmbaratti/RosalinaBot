const utils = require('./utils');

module.exports.handle = function (interaction, driver, channel, user, client) {
    if (interaction.data.options[0]) {
        let game = interaction.data.options[0].name;
        let title;
        let footer;
        switch (game) {
            case 'pogo':
                title = "Pokémon Go Friend Code";
                break;
            case 'feh':
                title = "Fire Emblem Heroes";
                break;
            case 'mkt':
                title = "Mario Kart Tour";
                break;
            default:
                title = game;
                footer = "";
        }

        if (interaction.data.options[0].options) {
            let option = interaction.data.options[0].options[0].name;
            if (option == 'share') {
                let mentionedUserID = user;
                let selfCall = true;
                if (interaction.data.options[0].options[0].options) { // If a user was specified
                    mentionedUserID = interaction.data.options[0].options[0].options[0].value;
                    selfCall = false;
                }
                client.users.fetch(user).then(requestingUser => {
                    client.users.fetch(mentionedUserID).then(mentionedUser => {
                        driver.getCode(mentionedUserID, game, selfCall).then(res => {
                            channel.send({
                                embed: {
                                    color: 0x86D0CF,
                                    author: {
                                        name: mentionedUser.username,
                                        icon_url: mentionedUser.avatarURL({dynamic: true})
                                    },
                                    title: title,
                                    description: res[game].code,
                                    footer: {
                                        text: "Requested by " + requestingUser.tag
                                    }
                                }
                            });
                        });
                    });
                });
            } else if (option == 'set') {
                let code = interaction.data.options[0].options[0].options[0].value;
                client.users.fetch(user).then(requestingUser => {
                    if (validateCode(game, code)) {
                        driver.setCode(interaction.member.user.id, game, code).then(res => {
                            channel.send({
                                embed: {
                                    color: 0x86D0CF,
                                    author: {
                                        name: requestingUser.username,
                                        icon_url: requestingUser.avatarURL({dynamic: true})
                                    },
                                    title: title + " Saved!",
                                    description: code,
                                    footer: {
                                        text: "Use the appropriate /game command to share your code"
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
                                    name: requestingUser.username,
                                    icon_url: requestingUser.avatarURL({dynamic: true})
                                },
                                title: "Could not save " + title + "!",
                                description: "You did not enter a valid " + title + ".",
                                footer: {
                                    text: footer
                                }
                            }
                        });
                    }
                });
            }
        }
    }
}

function validateCode(game, code) {
    switch (game) {
        case 'pogo':
            if (code.length == 12) {
                return true;
            }
            break
        case 'feh':

            break;
        default:
            return false;
    }
    return false;
}