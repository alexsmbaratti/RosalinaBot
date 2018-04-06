const Command = require('./Command.js');
const UpdateSwitchCodes = require('../cloudwatch/UpdateSwitchCodes.js');

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const url = 'mongodb://localhost:27017';

// Example: r!switchCode
// Example: r!switchCode @USER
// Example: r!switchCode clear
// Example: r!switchCode SW-XXXX-XXXX-XXXX

class SwitchCode extends Command {
  constructor(msg) {
    super(msg);
    try {
      var argument = msg.content.split(" ")[1].toLowerCase();
    } catch (e) {
      argument = "";
    }

    if (argument.startsWith("sw-")) {
      MongoClient.connect(url, function(err, client) {
        var db = client.db('bot');
        db.collection('users').findOne({
          _id: msg.author.id
        }, function(err, results) {
          if (results == null) {
            db.collection('users').insertOne({
              _id: msg.author.id,
              switchCode: argument.toUpperCase(),
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
          } else {
            db.collection('users').updateOne({
              "_id": msg.author.id
            }, {
              $set: {
                "switchCode": argument.toUpperCase()
              }
            });
          }
          client.close();
          msg.channel.send({
            embed: {
              color: 0x86D0CF,
              author: {
                name: "Code Saved!",
                icon_url: msg.author.avatarURL
              },
              title: "Nintendo Switch Code",
              description: argument.toUpperCase(),
              footer: {
                text: "Type 'r!help settings' for information about privacy settings."
              }
            }
          });
          console.log(`✅ Nintendo Switch Code saved for ` + msg.author.username);
        });
      })
    } else if (argument.startsWith("<@!") && argument.endsWith(">")) {
      MongoClient.connect(url, function(err, client) {
        var db = client.db('bot');
        var extractedID = extractID(msg);
        db.collection('users').findOne({
          "_id": extractedID
        }, function(err, results) {
          if (results == null || results.switchCode == "-1") {
            msg.channel.send({
              embed: {
                color: 0x86D0CF,
                author: {
                  name: msg.guild.members.get(extractedID).user.username,
                  icon_url: msg.guild.members.get(extractedID).user.avatarURL
                },
                title: "Nintendo Switch Code",
                description: "This user has not entered their code.",
                footer: {
                  text: "They must set it up with `r!switchcode SW-XXXX-XXXX-XXXX`"
                }
              }
            });
          } else {
            if (results.switchPrivacy == "PUBLIC") {
              msg.channel.send({
                embed: {
                  color: 0x86D0CF,
                  author: {
                    name: msg.guild.members.get(extractedID).user.username,
                    icon_url: msg.guild.members.get(extractedID).user.avatarURL
                  },
                  title: "Nintendo Switch Code",
                  description: results.switchCode
                }
              });
            } else {
              msg.channel.send({
                embed: {
                  color: 0x86D0CF,
                  author: {
                    name: msg.guild.members.get(extractedID).user.username,
                    icon_url: msg.guild.members.get(extractedID).user.avatarURL
                  },
                  title: "Nintendo Switch Code",
                  description: "This code has been kept private",
                  footer: {
                    text: "Privacy settings can be managed through r!settings"
                  }
                }
              });
            }
          }
        });
        client.close();
      });
    } else if (argument == "clear") {
      MongoClient.connect(url, function(err, client) {
        var db = client.db('bot');
        db.collection('users').updateOne({
          "_id": msg.author.id
        }, {
          $set: {
            "switchCode": "-1"
          }
        });
        client.close();
        msg.reply("Your Nintendo Switch friend code has been removed from my knowledge.");
      });
    } else if (argument == "") {
      MongoClient.connect(url, function(err, client) {
        var db = client.db('bot');
        var extractedID = extractID(msg);
        db.collection('users').findOne({
          "_id": msg.author.id
        }, function(err, results) {
          if (results == null || results.switchCode == "-1") {
            msg.channel.send({
              embed: {
                color: 0x86D0CF,
                author: {
                  name: msg.author.username,
                  icon_url: msg.author.avatarURL
                },
                title: "Nintendo Switch Code",
                description: "You have not entered a code.",
                footer: {
                  text: "You can set it up with `r!switchcode SW-XXXX-XXXX-XXXX`"
                }
              }
            });
          } else {
            msg.channel.send({
              embed: {
                color: 0x86D0CF,
                author: {
                  name: msg.author.username,
                  icon_url: msg.author.avatarURL
                },
                title: "Nintendo Switch Code",
                description: results.switchCode,
                footer: {
                  text: "Privacy settings can be managed through r!settings"
                }
              }
            });
          }
        });
        client.close();
      });
    } else {
      msg.channel.send(":x: Invalid usage!");
    }
    new UpdateSwitchCodes();
  }
}

function extractID(msg) {
  var text = msg.content.toLowerCase();
  var startIndex = -1;
  var endIndex = -1;
  var result = "";
  for (i = 0; i < text.length; i++) {
    if (text.substring(i, i + 2) == "<@") {
      if (text.substring(i + 2, i + 3) == "!") {
        startIndex = i + 3;
      } else {
        startIndex = i + 2;
      }
    }
    if (text.substring(i, i + 1) == ">") {
      endIndex = i;
    }
  }
  if (startIndex != -1 && endIndex != -1) {
    result = text.substring(startIndex, endIndex);
    console.log("Extracted: " + result);
    return result;
  } else {
    return "Extraction Failed!"
  }
}

function validateCode(code) {
  if (code.substring(0, 3) == "SW-") {
    if (code.length == 17) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}

module.exports = SwitchCode;
