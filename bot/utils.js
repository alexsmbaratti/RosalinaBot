module.exports.getOption = function (options, name) {
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

module.exports.sendDeprecationNotice = function (msg) {
    msg.channel.send({
        embed: {
            title: "We're Moving to Slash Commands!",
            url: "https://discord.com/oauth2/authorize?client_id=322405544490958849&permissions=17408&scope=applications.commands%20bot",
            color: 0x86D0CF,
            description: "To provide a better experience with less downtime, RosalinaBot is switching over to slash commands. To facilitate this, a new permission is required for your server. If RosalinaBot's slash commands do not appear when you type `/`, please ask a moderator or admin to reauthorize this bot with [this link](https://discord.com/oauth2/authorize?client_id=322405544490958849&permissions=17408&scope=applications.commands%20bot). To learn more about Discord Slash Commands, [click here](https://support.discord.com/hc/en-us/articles/1500000368501-Slash-Commands-FAQ).",
            footer: {
                text: "Normal commands will eventually be fully deprecated."
            }
        }
    });
}