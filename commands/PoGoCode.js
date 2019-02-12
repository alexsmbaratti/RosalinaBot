const Command = require('./Command.js');
const UpdatePoGoCodes = require('../cloudwatch/UpdatePoGoCodes.js');

const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';

// Example: r!PoGoCode
// Example: r!PoGoCode @USER
// Example: r!PoGoCode clear
// Example: r!PoGoCode XXXX-XXXX-XXXX

class PoGoCode extends Command {
  constructor(msg) {
    super(msg);
    try {
      var argument = msg.content.split(" ")[1].toLowerCase();
    } catch (e) {
      argument = "";
    }

    if (msg.mentions.everyone == false && msg.mentions.users.array()[0] != null) {
      MongoClient.connect(url, function(err, client) {
        var db = client.db('bot');
        var extractedID = msg.mentions.users.array()[0].id;
        db.collection('users').findOne({
          "_id": extractedID
        }, function(err, results) {
          if (results == null || results.poGoCode == "-1") {
            try {
            msg.channel.send({
              embed: {
                color: 0x86D0CF,
                author: {
                  name: msg.guild.members.get(extractedID).user.username,
                  icon_url: msg.guild.members.get(extractedID).user.avatarURL
                },
                title: "Pokémon Go Friend Code",
                description: "This user has not entered their code.",
                footer: {
                  text: "They must set it up with `r!poGoCode XXXX XXXX XXXX`"
                }
              }
            });
          } catch (e) {
            msg.channel.send("Unable to complete this request. The error is currently under investigation.");
            console.log("BAD POGO CODE");
            console.log("ID: " + extractedID);
            console.log(e);
          }
            console.log(`✅ Pokémon Go Code saved for ` + msg.author.username);
          } else {
            if (results.poGoPrivacy == "PUBLIC") {
              try {
                msg.channel.send("**" + msg.guild.members.get(extractedID).user.username + "'s Pokémon Go Friend Code**");
                msg.channel.send(results.poGoCode);
              } catch (e) {
                msg.channel.send("Unable to complete this request. The error is currently under investigation.");
                console.log("BAD POGO CODE");
                console.log("ID: " + extractedID);
                console.log(e);
              }
            } else {
              msg.channel.send({
                embed: {
                  color: 0x86D0CF,
                  author: {
                    name: msg.guild.members.get(extractedID).user.username,
                    icon_url: msg.guild.members.get(extractedID).user.avatarURL
                  },
                  title: "Pokémon Go Friend Code",
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
            "poGoCode": "-1"
          }
        });
        client.close();
        msg.reply("Your Pokémon Go friend code has been removed from my knowledge.");
      });
    } else if (argument == "") {
      MongoClient.connect(url, function(err, client) {
        var db = client.db('bot');
        db.collection('users').findOne({
          "_id": msg.author.id
        }, function(err, results) {
          if (results == null || results.poGoCode == "-1") {
            msg.channel.send({
              embed: {
                color: 0x86D0CF,
                author: {
                  name: msg.author.username,
                  icon_url: msg.author.avatarURL
                },
                title: "Pokémon Go Friend Code",
                description: "You have not entered a code.",
                footer: {
                  text: "You can set it up with `r!poGoCode XXXX XXXX XXXX`"
                }
              }
            });
          } else {
            msg.channel.send("**" + msg.author.username + "'s Pokémon Go Friend Code**");
            msg.channel.send(results.poGoCode);
          }
        });
        client.close();
      });
    } else {
      if (validateCode(msg.content.substring(11))) { // Cuts off r!poGoCode command
        var code = msg.content.substring(11);
        if (code.startsWith("iends in Pokémon GO! My Trainer Code is ")) {
          code = code.substring(40, 54);
        }
        console.log(code);
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
                poGoCode: code,
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
            } else {
              db.collection('users').updateOne({
                "_id": msg.author.id
              }, {
                $set: {
                  "poGoCode": code
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
                title: "Pokémon Go Friend Code",
                description: code,
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
    new UpdatePoGoCodes();
  }
}

function validateCode(code) {
  if (code.substring(0, 3) != "SW-") {
    if (code.length == 14 || code.length == 12) {
      return true;
    } else if (code.startsWith("iends in Pokémon GO! My Trainer Code is ") && code.endsWith("!") && code.length == 55) {
      return true;
    } else {
      return false;
    }
  }
}

module.exports = PoGoCode;
