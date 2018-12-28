const color = 0x86D0CF;

class Tutorial {
  constructor(msg) {
    msg.channel.send({
      embed: {
        author: {
          name: "Tutorial",
          icon_url: client.user.avatarURL
        },
        title: "Friend Codes",
        color: color,
        description: "This tutorial will guide you through the basics of friend codes."
      }
    });
  }
}

module.exports = Tutorial;
