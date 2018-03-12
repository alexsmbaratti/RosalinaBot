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
    var kingdom = -1;
    var iconName = "earth";
    try {
      var arg1 = msg.content.split(" ")[1].toLowerCase();
      var arg2 = msg.content.split(" ")[2].toLowerCase();
      switch (arg1.toLowerCase()) {
        case "cap":
        case "bonneton":
          kingdom = "cap";
          iconName = "cap";
          break;
        case "cascade":
        case "fossil":
          kingdom = "cascade";
          iconName = "cascade";
          break;
        case "sand":
        case "tostarena":
          kingdom = "sand";
          iconName = "sand";
          break;
        case "lake":
        case "lamode":
          kingdom = "lake";
          break;
        case "wood":
        case "wooded":
        case "steam":
        case "gardens":
          kingdom = "wood";
          iconName = "wood";
          break;
        case "lost":
        case "forgotten":
          kingdom = "lost";
          break;
        case "metro":
        case "newdonk":
        case "newdonkcity":
          kingdom = "metro";
          iconName = "metro";
          break;
        case "snow":
        case "shiveria":
          kingdom = "snow";
          iconName = "snow";
          break;
        case "seaside":
        case "bubblaine":
          kingdom = "seaside";
          break;
        case "luncheon":
        case "mountvolbono":
          kingdom = "luncheon";
          iconName = "luncheon";
          break;
        case "bowser":
        case "bowsercastle":
          kingdom = "bowser";
          break;
        case "moon":
        case "honeylune":
          kingdom = "moon";
          break;
        case "mushroom":
        case "peachcastle":
          kingdom = "mushroom";
          break;
      }
      if (kingdom == -1) {
        msg.channel.send("You did not enter a valid kingdom."); // Add example or help
      } else if (arg2.length != 9) {
        // Get code
      } else {
        // Set code
        MongoClient.connect(url, function(err, client) {
          var db = client.db('bot');
          var extractedID = extractID(msg);
          db.collection('users').findOne({
            "_id": extractedID
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
            db.collection('users').updateOne({
              "_id": msg.author.id
            }, {
              $set: {
                kingdom: arg2.toUpperCase()
              }
            });
            msg.channel.send({
              embed: {
                color: 0x86D0CF,
                author: {
                  name: "Code Saved!",
                  icon_url: "https://raw.githubusercontent.com/alexsmbaratti/RosalinaBot/indev/misc/icon_" + iconName + ".png"
                },
                description: arg2.toUpperCase()
              }
            });
            client.close();
          });
        });
      }
    } catch (e) {
      console.log("error: " + e)
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
