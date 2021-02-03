const utils = require('./utils');

module.exports.handle = function (interaction, channel) {
    let title = utils.getOption(interaction.data.options, 'title');
    let description = utils.getOption(interaction.data.options, 'description');

    if (description == undefined) {
        description = {value: undefined};
    }

    channel.send({
        embed: {
            color: 0x86D0CF,
            title: `**${title.value}**`,
            description: description.value
        }
    });
}