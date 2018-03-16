const Command = require('./Command.js');

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
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
    console.log(msg.content);
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
                dsCode: "-1",
                dsCode: "-1",
                switchPrivacy: arg2.toUpperCase(),
                dsPrivacy: "PRIVATE",
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
                  icon_url: msg.member.user.avatarURL
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
                dsCode: "-1",
                dsCode: "-1",
                switchPrivacy: "PRIVATE",
                dsPrivacy: arg2.toUpperCase(),
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
                  icon_url: msg.member.user.avatarURL
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
      console.log("A");
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
              switchPrivacy: "PRIVATE",
              dsPrivacy: "PRIVATE",
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
                  icon_url: msg.member.user.avatarURL
                },
                fields: [{
                    name: "*Nintendo 3DS Friend Code Privacy Setting*",
                    value: "PRIVATE"
                  },
                  {
                    name: "*Nintendo Switch Friend Code Privacy Setting*",
                    value: "PRIVATE"
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
                  icon_url: msg.member.user.avatarURL
                },
                fields: [{
                    name: "*Nintendo 3DS Friend Code Privacy Setting*",
                    value: results.dsPrivacy
                  },
                  {
                    name: "*Nintendo Switch Friend Code Privacy Setting*",
                    value: results.switchPrivacy
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
