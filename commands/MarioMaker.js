const Command = require('./Command.js');
const SMM = require('super-mario-maker-client');

// Example code: 0FCA-0000-02EE-948A
// Example site: https://supermariomakerbookmark.nintendo.net/courses/XXXX-XXXX-XXXX-XXXX

class MarioMaker extends Command {
  constructor(msg) {
    super(msg);
    try {
      var argument = msg.content.split(" ")[1].toUpperCase();
      SMM.fetchCourse(argument, function(error, course) {
        if (error) {
          msg.channel.send(":x: " + error);
          return;
        } else {
          var style = "";
          switch (course.gameStyle) {
            case "superMarioBros":
              style = "Super Mario Bros.";
              break;
            case "superMarioBros3":
              style = "Super Mario Bros. 3";
              break;
            case "superMarioWorld":
              style = "Super Mario World";
              break;
            case "newSuperMarioBrosU":
              style = "New Super Mario Bros. U";
              break;
          }

          msg.channel.send({
            embed: {
              color: 0x86D0CF,
              author: {
                name: course.creator.miiName,
                icon_url: course.creator.miiIconUrl
              },
              title: "**" + course.title + "**",
              description: style,
              url: "https://supermariomakerbookmark.nintendo.net/courses/" + argument,
              "thumbnail": {
                "url": course.thumbnailUrl
              },
              fields: [{
                  name: "Stars",
                  value: course.stars
                },
                {
                  name: "Clear Rate",
                  value: course.clearRate + "%"
                },
                {
                  name: "Attempts",
                  value: course.attempts
                }
              ],
              footer: {
                text: "Powered by Super Mario Maker Client"
              }
            }
          });
        }
      });
    } catch (e) {
      argument = "";
    }

  }
}

module.exports = MarioMaker;
