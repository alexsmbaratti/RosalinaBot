const Command = require('./Command.js');

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const url = 'mongodb://localhost:27017';

// r!smo mushroom XXX-XXX-XXX

/* Applicable Kingdoms:
 * Cap Kingdom
 * Cascade Kingdom
 * Sand Kingdom
 * Wooded Kingdom
 * Lake Kingdom
 * Lost Kingdom
 * Metro Kingdom
 * Snow Kingdom
 * Seaside Kingdom
 * Luncheon Kingdom
 * Bowser's Kingdom
 * Moon Kingdom
 * Mushroom Kingdom
 */

class SuperMarioOdyssey extends Command {
  constructor(msg) {
    super(msg);
    var kingdom = "-1";
    var kingdomName = "MISSINGNO.";
    var iconName = "earth";
    try {
      var arg1 = msg.content.split(" ")[1].toLowerCase();
    } catch (e) {
      arg1 = "";
    }
    try {
      var arg2 = msg.content.split(" ")[2].toLowerCase();
    } catch (e) {
      arg2 = "";
    }
    switch (arg1.toLowerCase()) {
      case "cap":
      case "bonneton":
        kingdom = "cap";
        kingdomName = "Cap Kingdom";
        iconName = "cap";
        break;
      case "cascade":
      case "fossil":
        kingdom = "cascade";
        kingdomName = "Cascade Kingdom";
        iconName = "cascade";
        break;
      case "sand":
      case "tostarena":
        kingdom = "sand";
        kingdomName = "Sand Kingdom";
        iconName = "sand";
        break;
      case "lake":
      case "lamode":
        kingdomName = "Lake Kingdom";
        kingdom = "lake";
        break;
      case "wood":
      case "wooded":
      case "steam":
      case "gardens":
        kingdom = "wooded";
        kingdomName = "Wooded Kingdom";
        iconName = "wood";
        break;
      case "lost":
      case "forgotten":
        kingdomName = "Lost Kingdom";
        kingdom = "lost";
        break;
      case "metro":
      case "newdonk":
      case "newdonkcity":
        kingdomName = "Metro Kingdom";
        kingdom = "metro";
        iconName = "metro";
        break;
      case "snow":
      case "shiveria":
        kingdom = "snow";
        kingdomName = "Snow Kingdom";
        iconName = "snow";
        break;
      case "seaside":
      case "bubblaine":
        kingdomName = "Seaside Kingdom";
        kingdom = "seaside";
        break;
      case "luncheon":
      case "mountvolbono":
        kingdom = "luncheon";
        kingdomName = "Luncheon Kingdom";
        iconName = "luncheon";
        break;
      case "bowser":
      case "bowsercastle":
        kingdomName = "Bowser's Kingdom";
        kingdom = "bowser";
        iconName = "bowser";
        break;
      case "moon":
      case "honeylune":
        kingdomName = "Moon Kingdom";
        kingdom = "moon";
        break;
      case "mushroom":
      case "peachcastle":
        kingdomName = "Mushroom Kingdom";
        kingdom = "mushroom";
        iconName = "mushroom";
        break;
    }
    if (kingdom == -1) {
      msg.channel.send("You did not enter a valid kingdom."); // Add example or help
    } else if (arg2 == "clear") {
      // Clear code
      MongoClient.connect(url, function(err, client) {
        var db = client.db('bot');
        switch (kingdom) {
          case "cap":
            db.collection('users').updateOne({
              "_id": msg.author.id
            }, {
              $set: {
                cap: "-1"
              }
            });
            break;
          case "cascade":
            db.collection('users').updateOne({
              "_id": msg.author.id
            }, {
              $set: {
                cascade: "-1"
              }
            });
            break;
          case "sand":
            db.collection('users').updateOne({
              "_id": msg.author.id
            }, {
              $set: {
                sand: "-1"
              }
            });
            break;
          case "lake":
            db.collection('users').updateOne({
              "_id": msg.author.id
            }, {
              $set: {
                lake: "-1"
              }
            });
            break;
          case "wood":
            db.collection('users').updateOne({
              "_id": msg.author.id
            }, {
              $set: {
                wooded: "-1"
              }
            });
            break;
          case "lost":
            db.collection('users').updateOne({
              "_id": msg.author.id
            }, {
              $set: {
                lost: "-1"
              }
            });
            break;
          case "metro":
            db.collection('users').updateOne({
              "_id": msg.author.id
            }, {
              $set: {
                metro: "-1"
              }
            });
            break;
          case "snow":
            db.collection('users').updateOne({
              "_id": msg.author.id
            }, {
              $set: {
                snow: "-1"
              }
            });
            break;
          case "seaside":
            db.collection('users').updateOne({
              "_id": msg.author.id
            }, {
              $set: {
                seaside: "-1"
              }
            });
            break;
          case "luncheon":
            db.collection('users').updateOne({
              "_id": msg.author.id
            }, {
              $set: {
                luncheon: "-1"
              }
            });
            break;
          case "bowser":
            db.collection('users').updateOne({
              "_id": msg.author.id
            }, {
              $set: {
                bowser: "-1"
              }
            });
            break;
          case "moon":
            db.collection('users').updateOne({
              "_id": msg.author.id
            }, {
              $set: {
                moon: "-1"
              }
            });
            break;
          case "mushroom":
            db.collection('users').updateOne({
              "_id": msg.author.id
            }, {
              $set: {
                mushroom: "-1"
              }
            });
            break;
        }
        client.close();
        msg.reply("Your " + kingdomName +" Balloon World code has been removed from my knowledge.");
      });
    } else if (arg2 == "") {
      // Get self code
      MongoClient.connect(url, function(err, client) {
        var db = client.db('bot');
        db.collection('users').findOne({
          "_id": msg.author.id
        }, function(err, results) {
          if (results == null || results[kingdom] == "-1") {
            msg.channel.send({
              embed: {
                color: 0x86D0CF,
                author: {
                  name: msg.author.username,
                  icon_url: msg.author.avatarURL
                },
                title: kingdomName + " Balloon Code",
                description: "You have not entered a code.",
                footer: {
                  text: "You can set it up with `r!smo [KINGDOM] [CODE]`"
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
                title: kingdomName + " Balloon Code",
                description: results[kingdom],
                thumbnail: {
                  url: "https://raw.githubusercontent.com/alexsmbaratti/RosalinaBot/indev/misc/icon_" + iconName + ".png"
                }
              }
            });
          }
          client.close();
        });
      });
    } else if (arg2.length == 9) { // Ensure mentions cannot fall here
      // Set code
      MongoClient.connect(url, function(err, client) {
        var db = client.db('bot');
        db.collection('users').findOne({
          "_id": msg.author.id
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
          }
          switch (kingdom) {
            case "cap":
              db.collection('users').updateOne({
                "_id": msg.author.id
              }, {
                $set: {
                  cap: arg2.toUpperCase()
                }
              });
              break;
            case "cascade":
              db.collection('users').updateOne({
                "_id": msg.author.id
              }, {
                $set: {
                  cascade: arg2.toUpperCase()
                }
              });
              break;
            case "sand":
              db.collection('users').updateOne({
                "_id": msg.author.id
              }, {
                $set: {
                  sand: arg2.toUpperCase()
                }
              });
              break;
            case "lake":
              db.collection('users').updateOne({
                "_id": msg.author.id
              }, {
                $set: {
                  lake: arg2.toUpperCase()
                }
              });
              break;
            case "wood":
              db.collection('users').updateOne({
                "_id": msg.author.id
              }, {
                $set: {
                  wooded: arg2.toUpperCase()
                }
              });
              break;
            case "lost":
              db.collection('users').updateOne({
                "_id": msg.author.id
              }, {
                $set: {
                  lost: arg2.toUpperCase()
                }
              });
              break;
            case "metro":
              db.collection('users').updateOne({
                "_id": msg.author.id
              }, {
                $set: {
                  metro: arg2.toUpperCase()
                }
              });
              break;
            case "snow":
              db.collection('users').updateOne({
                "_id": msg.author.id
              }, {
                $set: {
                  snow: arg2.toUpperCase()
                }
              });
              break;
            case "seaside":
              db.collection('users').updateOne({
                "_id": msg.author.id
              }, {
                $set: {
                  seaside: arg2.toUpperCase()
                }
              });
              break;
            case "luncheon":
              db.collection('users').updateOne({
                "_id": msg.author.id
              }, {
                $set: {
                  luncheon: arg2.toUpperCase()
                }
              });
              break;
            case "bowser":
              db.collection('users').updateOne({
                "_id": msg.author.id
              }, {
                $set: {
                  bowser: arg2.toUpperCase()
                }
              });
              break;
            case "moon":
              db.collection('users').updateOne({
                "_id": msg.author.id
              }, {
                $set: {
                  moon: arg2.toUpperCase()
                }
              });
              break;
            case "mushroom":
              db.collection('users').updateOne({
                "_id": msg.author.id
              }, {
                $set: {
                  mushroom: arg2.toUpperCase()
                }
              });
              break;
          }
          msg.channel.send({
            embed: {
              color: 0x86D0CF,
              title: kingdomName,
              author: {
                name: "Code Saved!",
                icon_url: msg.author.avatarURL
              },
              thumbnail: {
                url: "https://raw.githubusercontent.com/alexsmbaratti/RosalinaBot/indev/misc/icon_" + iconName + ".png"
              },
              description: arg2.toUpperCase()
            }
          });
          client.close();
        });
      });
    }
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

module.exports = SuperMarioOdyssey;
