const Command = require('../commands/Command.js');
const {RichEmbed} = require('discord.js');
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const color = 0x86D0CF;
const CreateUser = require('./CreateUser.js');
const Logger = require('../utils/Logger.js');

// r!acnh DODOCODE

class DodoCode extends Command {
    constructor(msg) {
        super(msg);
        var arg1;
        var arg2;
        var name;

        const pears = "Pears 🍐"
        const apples = "Apples 🍎"
        const peaches = "Peaches 🍑"
        const oranges = "Oranges 🍊"
        const cherries = "Cherries 🍒"

        try {
            arg1 = msg.content.split(" ")[1].toUpperCase();
        } catch (e) {
            arg1 = "";
        }
        try {
            arg2 = msg.content.split(" ")[2];
            switch (arg2.toLowerCase()) {
                case "🍐":
                case "pear":
                case "pears":
                    arg2 = pears;
                    break;
                case "🍎":
                case "a":
                case "apple":
                case "apples":
                    arg2 = apples;
                    break;
                case "🍑":
                case "peach":
                case "peachs":
                case "peaches":
                    arg2 = peaches;
                    break;
                case "🍊":
                case "orange":
                case "oranges":
                case "o":
                    arg2 = oranges;
                    break;
                case "c":
                case "🍒":
                case "cherry":
                case "cherrys":
                case "cherries":
                    arg2 = cherries;
                    break;
                default:
                    if (arg1.toLowerCase() != "island" && arg1.toLowerCase() != "name") {
                        arg2 = "NONE";
                    }
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
            msg.channel.send(":x: Invalid usage!\n\n*Usage Examples*\n`r!acnh [DODOCODE]` Sends your Dodo Code.\n`r!acnh name [ISLAND_NAME]` Saves the name of your island.\n`r!acnh fruit [NATIVE_FRUIT]` Saves the native fruit of your island.")
        } else { // First argument given
            let embed = new RichEmbed()
                .setTitle("**Animal Crossing New Horizons**")
                .setColor(color)
                .setAuthor(name + " is inviting you to their island!", msg.author.avatarURL)
                .setThumbnail("https://raw.githubusercontent.com/alexsmbaratti/RosalinaBot/indev/misc/ac_emblem_white.png")
            let footer = "Requires an active Nintendo Switch Online subscription to join"
            if (arg1.toLowerCase() == "island" || arg1.toLowerCase() == "name") {
                if (arg2.length < 11) {
                    MongoClient.connect(url, function (err, client) {
                        var db = client.db('bot');
                        db.collection('users').findOne({
                            _id: msg.author.id
                        }, function (err, results) {
                            if (results == null) {
                                new CreateUser(msg, db);
                            }
                            db.collection('users').updateOne({
                                "_id": msg.author.id
                            }, {
                                $set: {
                                    "acnhIslandName": arg2
                                }
                            });

                            client.close();
                            msg.channel.send({
                                embed: {
                                    color: color,
                                    author: {
                                        name: "Island Name Saved!",
                                        icon_url: msg.author.avatarURL
                                    },
                                    title: "Animal Crossing New Horizons Island Name",
                                    description: arg2,
                                    thumbnail: {
                                        url: "https://raw.githubusercontent.com/alexsmbaratti/RosalinaBot/indev/misc/ac_emblem_white.png"
                                    }
                                }
                            });
                            new Logger(`\x1b[32mAnimal Crossing Island Name saved for ` + msg.author.id + `\x1b[0m`);
                        });
                    })
                } else {
                    msg.channel.send(":x: Island Name was invalid.\n\n*Usage Examples*\n`r!acnh [DODOCODE]` Sends your Dodo Code.\n`r!acnh name [ISLAND_NAME]` Saves the name of your island.\n`r!acnh fruit [NATIVE_FRUIT]` Saves the native fruit of your island.")
                }
            } else if (arg1.toLowerCase() == "fruit") {
                if (arg2 == peaches || arg2 == pears || arg2 == apples || arg2 == cherries || arg2 == oranges) {
                    var fruitInt;
                    switch (arg2) {
                        case pears:
                            fruitInt = 1;
                            break;
                        case apples:
                            fruitInt = 2;
                            break;
                        case peaches:
                            fruitInt = 3;
                            break;
                        case oranges:
                            fruitInt = 4;
                            break;
                        case cherries:
                            fruitInt = 5;
                            break;
                        default:
                            fruitInt = -1;
                    }
                    MongoClient.connect(url, function (err, client) {
                        var db = client.db('bot');
                        db.collection('users').findOne({
                            _id: msg.author.id
                        }, function (err, results) {
                            if (results == null) {
                                new CreateUser(msg, db);
                            }
                            db.collection('users').updateOne({
                                "_id": msg.author.id
                            }, {
                                $set: {
                                    "acnhFruit": fruitInt
                                }
                            });

                            client.close();
                            msg.channel.send({
                                embed: {
                                    color: color,
                                    author: {
                                        name: "Native Fruit Saved!",
                                        icon_url: msg.author.avatarURL
                                    },
                                    title: "Animal Crossing New Horizons Native Fruit",
                                    description: arg2,
                                    thumbnail: {
                                        url: "https://raw.githubusercontent.com/alexsmbaratti/RosalinaBot/indev/misc/ac_emblem_white.png"
                                    }
                                }
                            });
                            new Logger(`\x1b[32mAnimal Crossing Native Fruit saved for ` + msg.author.id + `\x1b[0m`);
                        });
                    })
                } else {
                    msg.channel.send(":x: Fruit was invalid.\n\n*Usage Examples*\n`r!acnh [DODOCODE]` Sends your Dodo Code.\n`r!acnh name [ISLAND_NAME]` Saves the name of your island.\n`r!acnh fruit [NATIVE_FRUIT]` Saves the native fruit of your island.")
                }
            } else if (arg1.length == 5 && arg1.toLowerCase() != "fruit") { // Valid ID
                embed.addField("Dodo Code", arg1, true);

                MongoClient.connect(url, function (err, client) {
                    var db = client.db('bot');
                    db.collection('users').findOne({
                        "_id": msg.author.id
                    }, function (err, results) {
                        if (results != null) {
                            if (results.acnhIslandName != "") {
                                try {
                                    embed.addField("Island Name", results.acnhIslandName, true);
                                } catch (e) {
                                    console.log(e)
                                }
                            } else {
                                footer += "\nSet your island name using r!acnh name [ISLAND_NAME]"
                            }
                            if (results.acnhFruit != -1) {
                                let fruit;
                                switch (results.acnhFruit) {
                                    case 1:
                                        fruit = pears;
                                        break;
                                    case 2:
                                        fruit = apples;
                                        break;
                                    case 3:
                                        fruit = peaches;
                                        break;
                                    case 4:
                                        fruit = oranges;
                                        break;
                                    case 5:
                                        fruit = cherries;
                                        break;
                                    default:
                                        fruit = "ERROR";
                                }
                                embed.addField("Native Fruit", fruit, true);
                            } else {
                                if (arg2 == peaches || arg2 == pears || arg2 == apples || arg2 == cherries || arg2 == oranges) {
                                    embed.addField("Native Fruit", arg2, true);
                                }
                                footer += "\nSave your island's native fruit using r!acnh fruit [FRUIT]"
                            }
                        } else {
                            embed.setAuthor(name + " is inviting you to their island!", msg.author.avatarURL)
                            footer += "\nSet your island's name using r!acnh name [ISLAND_NAME]"
                            footer += "\nSave your island's native fruit using r!acnh fruit [FRUIT]"
                        }
                        client.close()
                        embed.setFooter(footer)
                        msg.channel.send(embed)
                    })
                });
            } else { // ID not valid
                msg.channel.send(":x: Dodo Code was invalid.\n\n*Usage Examples*\n`r!acnh [DODOCODE]` Sends your Dodo Code.\n`r!acnh name [ISLAND_NAME]` Saves the name of your island.\n`r!acnh fruit [NATIVE_FRUIT]` Saves the native fruit of your island.")
            }
        }
    }
}

module.exports = DodoCode;