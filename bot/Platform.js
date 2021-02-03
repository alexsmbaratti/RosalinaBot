const utils = require('./utils');

module.exports.handle = function (interaction, driver, channel, user, client) {
    if (interaction.data.options[0]) {
        let platform = interaction.data.options[0].name;
        let title;
        let footer;
        switch (platform) {
            case 'switch':
                title = "Nintendo Switch Friend Code";
                footer = "Valid Nintendo Switch Friend Codes look like SW-XXXX-XXXX-XXXX";
                break;
            case '3ds':
                platform = 'ds';
                title = "Nintendo 3DS Friend Code";
                footer = "Valid Nintendo 3DS Friend Codes look like XXXX-XXXX-XXXX";
                break;
            default:
                title = platform;
                footer = "";
        }

        if (interaction.data.options[0].options) {
            let option = interaction.data.options[0].options[0].name;
            if (option == 'share') {
                let mentionedUserID = user;
                let selfCall = true;
                if (interaction.data.options[0].options[0].options) { // If a user was specified
                    mentionedUserID = interaction.data.options[0].options[0].options[0].value;
                    if (mentionedUserID != user) {
                        selfCall = false;
                    }
                }
                utils.getUser(client, user).then(requestingUser => {
                    utils.getUser(client, mentionedUserID).then(mentionedUser => {
                        driver.getCode(mentionedUserID, platform, selfCall).then(res => {
                            channel.send({
                                embed: {
                                    color: 0x86D0CF,
                                    author: {
                                        name: mentionedUser.username,
                                        icon_url: mentionedUser.avatarURL({dynamic: true})
                                    },
                                    title: title,
                                    description: res[platform].code,
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
                let public = interaction.data.options[0].options[0].options[1];
                if (public == undefined) {
                    public = true; // Codes are public by default
                } else {
                    public = !public.value;
                }
                utils.getUser(client, user).then(requestingUser => {
                    if (validateCode(platform, code)) {
                        driver.setCode(interaction.member.user.id, platform, code, public).then(res => {
                            channel.send({
                                embed: {
                                    color: 0x86D0CF,
                                    author: {
                                        name: requestingUser.username,
                                        icon_url: requestingUser.avatarURL({dynamic: true})
                                    },
                                    title: title + " Saved!",
                                    description: public ? code : "Private Code",
                                    footer: {
                                        text: "Use the appropriate /platform command to share your code"
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
            } else if (option === 'clear') {
                driver.clearCode(interaction.member.user.id, platform).then(res => {
                    utils.getUser(client, user).then(requestingUser => {
                        channel.send({
                            embed: {
                                color: 0x86D0CF,
                                author: {
                                    name: requestingUser.username,
                                    icon_url: requestingUser.avatarURL({dynamic: true})
                                },
                                title: res.modifiedCount == 0 ? title + " Is Not Set" : title + " Removed",
                                footer: {
                                    text: res.modifiedCount == 0 ? "Use the appropriate /platform command to set your code" : undefined
                                }
                            }
                        });
                    });
                }).catch(err => console.error(err));
            }
        }
    }
}

function validateCode(platform, code) {
    switch (platform) {
        case 'switch':
            if (code.substring(0, 3).toLowerCase() == "sw-") {
                if (code.length == 17) {
                    return true;
                } else {
                    return false;
                }
            } else {
                return false;
            }
            break;
        case 'ds':
            if (code.substring(0, 3).toLowerCase() != "sw-") {
                if (code.length == 14) {
                    return true;
                } else {
                    return false;
                }
            } else {
                return false;
            }
            break;
        default:
            return false;
    }
}