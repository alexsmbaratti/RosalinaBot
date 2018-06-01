const Command = require('./Command.js');
var config = require('../config.json');
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const url = 'mongodb://localhost:27017';

const switchIcon = "<:switch:434587349117042698>";
const dsIcon = "<:ds:434587539173670913>";

class Status extends Command {
  constructor(msg, build, client) {
    super(msg);
    if (msg.author.id == config.alexsmbaratti) { // Admin only command
      // Status, build, ping, guilds, codes, mongoDB, CloudWatch, DBL, Pokedex, SMM, CPU Usage
      // Pass in "this" from app.js

      var switchCodes;
      var dsCodes;
      MongoClient.connect(url, function(err, mongoClient) {
        var db = mongoClient.db('bot');
        db.collection('users').count({
          switchCode: {
            $ne: "-1"
          }
        }, function(err, results) {
          switchCodes = results;
          db.collection('users').count({
            dsCode: {
              $ne: "-1"
            }
          }, function(err, results) {
            dsCodes = results;
            mongoClient.close();
            let start = msg.createdTimestamp;
            msg.channel.send("```Status\n✅ Logged in as " + client.user.username + "!\n🔨 Build: " + build + "\n⏱ Ping: ...```")
              .then(message => {
                let diff = (message.createdTimestamp - start);
                message.edit("Status\n✅ Logged in as " + client.user.username + "!\n🔨 Build: " + build + "\n⏱ Ping: " + diff + "ms\n👥 Guilds Serving: " + client.guilds.size + "\n" + switchIcon + "  Nintendo Switch Codes: " + switchCodes + "\n" + dsIcon + "  Nintendo 3DS Codes: " + dsCodes + "");
              })
              .catch(console.error);
          });
        });
      });
    }
  }
}

module.exports = Status;
