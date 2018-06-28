var http = require('https');
const Command = require('./Command.js');

const color = 0x86D0CF;
const changelogSource = "https://raw.githubusercontent.com/alexsmbaratti/RosalinaBot/master/CHANGELOG.md";

class Changelog extends Command {
  constructor(msg) {
    super(msg);

    var request = http.get(changelogSource, function(res) {
      var data = '';
      res.on('data', function(chunk) {
        data += chunk;
      });
      res.on('end', function() {
        msg.channel.send("```" + parseResponse(data) + "```");
        msg.channel.send({
          embed: {
            author: {
              name: "Changelog",
              icon_url: "https://raw.githubusercontent.com/alexsmbaratti/RosalinaBot/master/misc/github-favicon.png"
            },
            title: parseBuild(data),
            url: "https://github.com/alexsmbaratti/RosalinaBot/blob/master/CHANGELOG.md",
            color: color,
            description: parseResponse(data)
          }
        });
      });
    });
    request.on('error', function(e) {
      msg.channel.send("An unknown error occurred.");
      console.log(e.message);
    });
    request.end();
  }
}

function parseResponse(response) {
  return response.substring(response.indexOf("*")).substring(0, response.substring(response.indexOf("*")).indexOf("## Build"));
}

function parseBuild(response) {
  return response.substring(15, response.indexOf("*"));
}

module.exports = Changelog;
