const Command = require('../commands/Command.js');
const {RichEmbed} = require('discord.js');
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const color = 0x86D0CF;

// r!acnh DODOCODE

class DodoCode extends Command {
    constructor(msg) {
        super(msg);
        var arg1;
        var arg2;
        var name;
        try {
            arg1 = msg.content.split(" ")[1].toUpperCase();
        } catch (e) {
            arg1 = "";
        }
        try {
            arg2 = msg.content.split(" ")[2].toUpperCase();
            switch (arg2.toLowerCase()) {
                case "🍐":
                case "pear":
                case "pears":
                    arg2 = "Pears 🍐";
                    break;
                case "🍎":
                case "a":
                case "apple":
                case "apples":
                    arg2 = "Apples 🍎";
                    break;
                case "🍑":
                case "peach":
                case "peachs":
                case "peaches":
                    arg2 = "Peaches 🍑";
                    break;
                case "🍊":
                case "orange":
                case "oranges":
                case "o":
                    arg2 = "Oranges 🍊";
                    break;
                case "c":
                case "🍒":
                case "cherry":
                case "cherrys":
                case "cherries":
                    arg2 = "Cherries 🍒";
                    break;
                default:
                    arg2 = "NONE";
            }
        } catch (e) {
            arg2 = "NONE";
        }

        try {
            name = msg.member.displayName;
        } catch (e) {
            name = msg.author.username;
        }

        if (arg1 == "") { // No arguments given
            msg.channel.send(":x: Invalid usage!\nCorrect usage is: `r!acnh [DODOCODE]`.")
        } else { // First argument given
            let embed = new RichEmbed()
                .setTitle("**Animal Crossing New Horizons**")
                .setAuthor(name + " is inviting you to their island!", msg.author.avatarURL)
                .setColor(color)
                .setThumbnail("https://raw.githubusercontent.com/alexsmbaratti/RosalinaBot/indev/misc/ac_emblem_white.png")
                .setFooter("Requires an active Nintendo Switch Online subscription to join")
            if (arg1.length == 5) { // Valid ID
                embed.addField("Dodo Code", arg1, true);
                if (arg2 != "NONE") {
                    embed.addField("Native Fruit", arg2, true);
                }

                MongoClient.connect(url, function (err, client) {
                    var db = client.db('bot');
                    db.collection('users').findOne({
                        "_id": msg.author.id
                    }, function (err, results) {
                        if (results != null) {
                            if (results.acnhIslandName != "-1") {
                                embed.setAuthor(name + " is inviting you to " + results.acnhIslandName + "!", msg.author.avatarURL);
                            }
                            if (results.acnhFruit != "-1") {
                                let fruit;
                                switch (arg2.toLowerCase()) {
                                    case "1":
                                        fruit = "Pears 🍐";
                                        break;
                                    case "2":
                                        fruit = "Apples 🍎";
                                        break;
                                    case "3":
                                        fruit = "Peaches 🍑";
                                        break;
                                    case "4":
                                        fruit = "Oranges 🍊";
                                        break;
                                    case "5":
                                        fruit = "Cherries 🍒";
                                        break;
                                    default:
                                        fruit = "ERROR";
                                }
                                embed.addField("Native Fruit", fruit, true);
                            }
                        }
                        client.close();
                    })
                });


                msg.channel.send(embed);
            } else { // ID not valid
                msg.channel.send(":x: Dodo Code was invalid.")
            }
        }
    }
}

module.exports = DodoCode;