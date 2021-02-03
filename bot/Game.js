const utils = require('./utils');

module.exports.handle = function (interaction, driver, channel, user, client) {
    if (interaction.data.options[0]) {
        let game = interaction.data.options[0].name;
        let title;
        let footer;
        switch (game) {
            case 'pogo':
                title = "Pokémon Go Friend Code";
                footer = "Valid Pokémon Go Friend Codes look like XXXX XXXX XXXX";
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
                utils.getUser(client, user).then(requestingUser => {
                    utils.getUser(client, mentionedUserID).then(mentionedUser => {
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
                if ((game == 'pogo' || game == 'mkt') && code.length == 12) {
                    code = code.substring(0, 4) + ' ' + code.substring(4, 8) + ' ' + code.substring(8, 12);
                }
                utils.getUser(client, user).then(requestingUser => {
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
            if (code.split(' ').length == 3) {
                let splitCode = code.split(' ');
                for (let i = 0; i < 3; i++) {
                    if (splitCode[i].length != 4 || isNaN(splitCode[i])) {
                        return false;
                    }
                }
                return true;
            }
            break
        case 'feh':
            if (code.length == 10 && !isNaN(code)) {
                return true;
            }
            break;
        case 'mkt':
            if (code.split(' ').length == 3) {
                let splitCode = code.split(' ');
                for (let i = 0; i < 3; i++) {
                    if (splitCode[i].length != 4 || isNaN(splitCode[i])) {
                        return false;
                    }
                }
                return true;
            }
            break;
        default:
            return false;
    }
    return false;
}