const Command = require('./Command.js');

const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';

class Settings extends Command {
  constructor(msg) {
    super(msg);
    try {
      var arg1 = msg.content.split(" ")[1].toLowerCase();
      var arg2 = msg.content.split(" ")[2].toLowerCase();
    } catch (e) {
      if (arg1 == null) {
        arg1 = "";
      }
      if (arg2 == null) {
        arg2 = "";
      }
    }
    console.log(msg.content + " with ID " + msg.author.id);
    if (arg1 != "" && (arg2 == "public" || arg2 == "private")) {
      if (arg1 == "switchcode" || arg1 == "switch") {
        MongoClient.connect(url, function(err, client) {
          var db = client.db('bot');
          db.collection('users').findOne({
            _id: msg.author.id
          }, function(err, results) {
            if (results == null) {
              db.collection('users').insertOne({
                _id: msg.author.id,
                switchCode: "-1",
                dsCode: "-1",
                poGoCode: "-1",
                switchPrivacy: arg2.toUpperCase(),
                dsPrivacy: "PUBLIC",
                poGoPrivacy: "PUBLIC",
                bowser: "-1",
                cap: "-1",
                cascade: "-1",
                lake: "-1",
                lost: "-1",
                luncheon: "-1",
                metro: "-1",
                moon: "-1",
                mushroom: "-1",
                sand: "-1",
                seaside: "-1",
                snow: "-1",
                wooded: "-1"
              });
            } else {
              db.collection('users').updateOne({
                "_id": msg.author.id
              }, {
                $set: {
                  "switchPrivacy": arg2.toUpperCase()
                }
              });
            }
            client.close();
            msg.channel.send({
              embed: {
                color: 0x86D0CF,
                author: {
                  name: "Nintendo Switch Code Privacy Updated!",
                  icon_url: msg.author.avatarURL
                },
                description: arg2.toUpperCase(),
                footer: {
                  text: "Type 'r!help settings' for information about privacy settings."
                }
              }
            });
          });
        })
      } else if (arg1 == "dscode" || arg1 == "3dscode" || arg1 == "3ds") {
        MongoClient.connect(url, function(err, client) {
          var db = client.db('bot');
          db.collection('users').findOne({
            _id: msg.author.id
          }, function(err, results) {
            if (results == null) {
              db.collection('users').insertOne({
                _id: msg.author.id,
                switchCode: "-1",
                dsCode: "-1",
                poGoCode: "-1",
                switchPrivacy: "PUBLIC",
                dsPrivacy: arg2.toUpperCase(),
                poGoPrivacy: "PUBLIC",
                bowser: "-1",
                cap: "-1",
                cascade: "-1",
                lake: "-1",
                lost: "-1",
                luncheon: "-1",
                metro: "-1",
                moon: "-1",
                mushroom: "-1",
                sand: "-1",
                seaside: "-1",
                snow: "-1",
                wooded: "-1"
              });
            } else {
              db.collection('users').updateOne({
                "_id": msg.author.id
              }, {
                $set: {
                  "dsPrivacy": arg2.toUpperCase()
                }
              });
            }
            client.close();
            msg.channel.send({
              embed: {
                color: 0x86D0CF,
                author: {
                  name: "Nintendo 3DS Code Privacy Updated!",
                  icon_url: msg.author.avatarURL
                },
                description: arg2.toUpperCase(),
                footer: {
                  text: "Type 'r!help settings' for information about privacy settings."
                }
              }
            });
          });
        })
      } else if (arg1 == "pogocode" || arg1 == "pogo" || arg1 == "pokemongo") {
        MongoClient.connect(url, function(err, client) {
          var db = client.db('bot');
          db.collection('users').findOne({
            _id: msg.author.id
          }, function(err, results) {
            if (results == null) {
              db.collection('users').insertOne({
                _id: msg.author.id,
                switchCode: "-1",
                dsCode: "-1",
                poGoCode: "-1",
                switchPrivacy: "PUBLIC",
                dsPrivacy: "PUBLIC",
                poGoPrivacy: arg2.toUpperCase(),
                bowser: "-1",
                cap: "-1",
                cascade: "-1",
                lake: "-1",
                lost: "-1",
                luncheon: "-1",
                metro: "-1",
                moon: "-1",
                mushroom: "-1",
                sand: "-1",
                seaside: "-1",
                snow: "-1",
                wooded: "-1"
              });
            } else {
              db.collection('users').updateOne({
                "_id": msg.author.id
              }, {
                $set: {
                  "poGoPrivacy": arg2.toUpperCase()
                }
              });
            }
            client.close();
            msg.channel.send({
              embed: {
                color: 0x86D0CF,
                author: {
                  name: "Pokémon Go Code Privacy Updated!",
                  icon_url: msg.author.avatarURL
                },
                description: arg2.toUpperCase(),
                footer: {
                  text: "Type 'r!help settings' for information about privacy settings."
                }
              }
            });
          });
        })
      }
    } else if (msg.content.length == 10) { // r!settings
      MongoClient.connect(url, function(err, client) {
        var db = client.db('bot');
        db.collection('users').findOne({
          _id: msg.author.id
        }, function(err, results) {
          if (results == null) {
            db.collection('users').insertOne({
              _id: msg.author.id,
              switchCode: "-1",
              dsCode: "-1",
              poGoCode: "-1",
              switchPrivacy: "PUBLIC",
              dsPrivacy: "PUBLIC",
              poGoPrivacy: "PUBLIC",
              bowser: "-1",
              cap: "-1",
              cascade: "-1",
              lake: "-1",
              lost: "-1",
              luncheon: "-1",
              metro: "-1",
              moon: "-1",
              mushroom: "-1",
              sand: "-1",
              seaside: "-1",
              snow: "-1",
              wooded: "-1"
            });
            msg.channel.send({
              embed: {
                color: 0x86D0CF,
                author: {
                  name: "Settings for " + msg.author.username,
                  icon_url: msg.author.avatarURL
                },
                fields: [{
                    name: "*Nintendo 3DS Friend Code Privacy Setting*",
                    value: "PUBLIC"
                  },
                  {
                    name: "*Nintendo Switch Friend Code Privacy Setting*",
                    value: "PUBLIC"
                  },
                  {
                    name: "*Pokémon Go Friend Code Privacy Setting*",
                    value: "PUBLIC"
                  }
                ],
                footer: {
                  text: "Type 'r!help settings' for information about changing these settings."
                }
              }
            });
          } else {
            msg.channel.send({
              embed: {
                color: 0x86D0CF,
                author: {
                  name: "Settings for " + msg.author.username,
                  icon_url: msg.author.avatarURL
                },
                fields: [{
                    name: "*Nintendo 3DS Friend Code Privacy Setting*",
                    value: results.dsPrivacy
                  },
                  {
                    name: "*Nintendo Switch Friend Code Privacy Setting*",
                    value: results.switchPrivacy
                  },
                  {
                    name: "*Pokémon Go Friend Code Privacy Setting*",
                    value: results.poGoPrivacy
                  }
                ],
                footer: {
                  text: "Type 'r!help settings' for information about changing these settings."
                }
              }
            });
          }
          client.close();
        });
      })
    } else {
      msg.channel.send(":x: Invalid usage!");
    }
  }
}

module.exports = Settings;
