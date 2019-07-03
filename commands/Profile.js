const Command = require('./Command.js');
const color = 0x86D0CF;

class Profile extends Command {
  constructor(msg) {
    super(msg);
    msg.channel.send({
      embed: {
        author: {
          name: msg.author.username,
          icon_url: msg.author.avatarURL
        },
        title: "Profile",
        color: color
      }
    });
  }
}

module.exports = Profile;
