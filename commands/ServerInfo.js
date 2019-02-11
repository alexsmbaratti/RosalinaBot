const Command = require('../commands/Command.js');
const color = 0x86D0CF;

class ServerInfo extends Command {
  constructor(msg) {
    super(msg);
    // Roles and IDs
    // Channels
    try {
      var mGuild = msg.guild;
      if (mGuild.available) {
        var bots = 0;
        var plural = " bot)";
        for (var i = 0; i < mGuild.members.array().length; i++) {
          if (mGuild.members.array()[i].user.bot) {
            bots++;
            if (bots > 1) {
              plural = " bots)";
            }
          }
        }
        msg.channel.send({
          embed: {
            title: mGuild.name,
            color: color,
            fields: [{
                name: "Members",
                value: mGuild.memberCount + " (including " + bots + plural,
                inline: true
              },
              {
                name: "Region",
                value: mGuild.region,
                inline: true
              },
              {
                name: "Owner",
                value: mGuild.owner.user.tag,
                inline: true
              },
              {
                name: "Server ID",
                value: mGuild.id,
                inline: true
              }
            ],
            thumbnail: {
              url: mGuild.iconURL
            },
            footer: {
              text: "Requested by " + msg.member.displayName,
              icon_url: msg.author.avatarURL
            }
          }
        });
      } else {
        msg.channel.send({
          embed: {
            description: "Server Unavailable",
            color: color,
            footer: {
              text: "Please try again later"
            }
          }
        });
      }
    } catch (e) {
      msg.channel.send({
        embed: {
          description: "Cannot Get Server Info",
          color: color
        }
      });
    }
  }
}

module.exports = ServerInfo;
