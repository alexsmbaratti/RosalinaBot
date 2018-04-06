const Command = require('./Command.js');
const Update3DSCodes = require('../cloudwatch/Update3DSCodes.js');

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const url = 'mongodb://localhost:27017';

// Example: r!dsCode
// Example: r!dsCode @USER
// Example: r!dsCode clear
// Example: r!dsCode XXXX-XXXX-XXXX

class DSCode extends Command {
  constructor(msg) {
    super(msg);
    try {
      var argument = msg.content.split(" ")[1].toLowerCase();
    } catch (e) {
      argument = "";
    }

    if (argument.startsWith("<@!") && argument.endsWith(">")) {
      MongoClient.connect(url, function(err, client) {
        var db = client.db('bot');
        var extractedID = extractID(msg);
        db.collection('users').findOne({
          "_id": extractedID
        }, function(err, results) {
          if (results == null || results.dsCode == "-1") {
            msg.channel.send({
              embed: {
                color: 0x86D0CF,
                author: {
                  name: msg.guild.members.get(extractedID).user.username,
                  icon_url: msg.guild.members.get(extractedID).user.avatarURL
                },
                title: "Nintendo 3DS Code",
                description: "This user has not entered their code.",
                footer: {
                  text: "They must set it up with `r!dsCode XXXX-XXXX-XXXX`"
                }
              }
            });
            console.log(`✅ Nintendo 3DS Code saved for ` + msg.author.username);
          } else {
            if (results.dsPrivacy == "PUBLIC") {
              msg.channel.send({
                embed: {
                  color: 0x86D0CF,
                  author: {
                    name: msg.guild.members.get(extractedID).user.username,
                    icon_url: msg.guild.members.get(extractedID).user.avatarURL
                  },
                  title: "Nintendo 3DS Code",
                  description: results.dsCode
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
                  title: "Nintendo 3DS Code",
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
            "dsCode": "-1"
          }
        });
        client.close();
        msg.reply("Your Nintendo 3DS friend code has been removed from my knowledge.");
      });
    } else if (argument == "") {
      MongoClient.connect(url, function(err, client) {
        var db = client.db('bot');
        db.collection('users').findOne({
          "_id": msg.author.id
        }, function(err, results) {
          if (results == null || results.dsCode == "-1") {
            msg.channel.send({
              embed: {
                color: 0x86D0CF,
                author: {
                  name: msg.author.username,
                  icon_url: msg.author.avatarURL
                },
                title: "Nintendo 3DS Code",
                description: "You have not entered a code.",
                footer: {
                  text: "You can set it up with `r!dsCode XXXX-XXXX-XXXX`"
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
                title: "Nintendo 3DS Code",
                description: results.dsCode,
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
      if (validateCode(argument)) {
        MongoClient.connect(url, function(err, client) {
          var db = client.db('bot');
          db.collection('users').findOne({
            _id: msg.author.id
          }, function(err, results) {
            if (results == null) {
              db.collection('users').insertOne({
                _id: msg.author.id,
                dsCode: "-1",
                dsCode: argument,
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
                  "dsCode": argument
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
                title: "Nintendo 3DS Code",
                description: argument.toUpperCase(),
                footer: {
                  text: "Type 'r!help settings' for information about privacy settings."
                }
              }
            });
          });
        })
      } else {
        msg.channel.send(":x: Invalid usage!");
      }
    }
    new Update3DSCodes();
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
  if (code.substring(0, 3) != "SW-") {
    if (code.length == 14) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}

module.exports = DSCode;
