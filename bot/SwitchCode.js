const utils = require('./utils');

module.exports.handle = function (interaction, driver, channel, user, client) {
    let mentionedUser = utils.getOption(interaction.data.options, 'user');
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
}

