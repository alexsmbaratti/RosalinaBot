const https = require('https');
var config = require('../config.json');

class PostToDBL {
  constructor(client) {
    var request = https.request({
        hostname: "discordbotlist.com",
        path: "/api/bots/322405544490958849/stats",
        method: 'POST',
        headers: {
          'Authorization': config.DBL2_TOKEN,
          'Content-Type': 'application/json'
        }
      },
      (response) => {
        response.setEncoding('utf8');
        let data = '';
        response.on('data', (chunk) => {
          data += chunk;
        });
        response.on('error', (err) => {
          console.log(err);
        })
        response.on('end', () => {
          console.log("Guild post returned: " + response.statusMessage);
        });
      }
    ).on('error', (err) => {
      console.log(err);
    });

    request.write(JSON.stringify({
      guildCount: client.guilds.size,
      users: client.users.size,
      voice_connections: client.voiceConnections.size
    }));

    request.end();
  }
}

module.exports = PostToDBL;
