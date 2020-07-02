const Command = require('./Command.js');
var config = require('../config.json');
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const color = 0x86D0CF;

class Status extends Command {
  constructor(msg, build, client) {
    super(msg);
    if (msg.author.id == config.alexsmbaratti) { // Admin only command
      // Status, build, ping, guilds, codes, mongoDB, CloudWatch, DBL, Pokedex, SMM, CPU Usage
      // Pass in "this" from app.js

      var switchCodes;
      var dsCodes;
      var poGoCodes;
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
            db.collection('users').count({
              poGoCode: {
                $ne: "-1"
              }
            }, function(err, results) {
              poGoCodes = results;
              mongoClient.close();
              let start = msg.createdTimestamp;
              msg.channel.send({
                  embed: {
                    title: "Status",
                    color: color,
                    fields: [{
                        name: "Ping",
                        value: '...',
                        inline: true
                      },
                      {
                        name: "Build",
                        value: build,
                        inline: true
                      },
                      {
                        name: "Platform",
                        value: "...",
                        inline: true
                      },
                      {
                        name: "Guilds",
                        value: client.guilds.size,
                        inline: true
                      },
                      {
                        name: "Users",
                        value: client.users.size,
                        inline: true
                      },
                      {
                        name: "Total Codes",
                        value: (switchCodes + dsCodes + poGoCodes),
                        inline: true
                      },
                      {
                        name: "Switch Codes",
                        value: switchCodes,
                        inline: true
                      },
                      {
                        name: "3DS Codes",
                        value: dsCodes,
                        inline: true
                      },
                      {
                        name: "Pokémon Go Codes",
                        value: poGoCodes,
                        inline: true
                      }
                    ]
                  }
                }).then(message => {
                  let diff = (message.createdTimestamp - start);
                  var platform = process.env.PLATFORM;
                  if (platform == undefined) {
                    platform = "Unknown";
                  }
                  message.edit({
                      embed: {
                        title: "Status",
                        color: color,
                        fields: [{
                            name: "Ping",
                            value: (diff + " ms"),
                            inline: true
                          },
                          {
                            name: "Build",
                            value: build,
                            inline: true
                          },
                          {
                            name: "Platform",
                            value: platform,
                            inline: true
                          },
                          {
                            name: "Guilds",
                            value: client.guilds.size,
                            inline: true
                          },
                          {
                            name: "Users",
                            value: client.users.size,
                            inline: true
                          },
                          {
                            name: "Total Codes",
                            value: (switchCodes + dsCodes + poGoCodes),
                            inline: true
                          },
                          {
                            name: "Switch Codes",
                            value: switchCodes,
                            inline: true
                          },
                          {
                            name: "3DS Codes",
                            value: dsCodes,
                            inline: true
                          },
                          {
                            name: "Pokémon Go Codes",
                            value: poGoCodes,
                            inline: true
                          }
                        ]
                      }
                    })
                })
                .catch(console.error);
            });
          });
        });
      });
    } else {
      msg.channel.send("The status command is a debugging tool only available for developers.");
    }
  }
}

module.exports = Status;
