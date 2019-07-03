const Command = require('./Command.js');
const CreateUser = require('./CreateUser.js');
const UpdateFEHCodes = require('../cloudwatch/UpdateFEHCodes.js');

const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';

var color = 0x86D0CF;

// Example: r!feh
// Example: r!feh @USER
// Example: r!feh clear
// Example: r!feh XXXXXXXXXX

class FireEmblemHeroes extends Command {
    constructor(msg) {
        super(msg);
        try {
            var argument = msg.content.split(" ")[1].toLowerCase();
        } catch (e) {
            argument = "";
        }

        if (msg.mentions.everyone == false && msg.mentions.users.array()[0] != null) {
            MongoClient.connect(url, function (err, client) {
                var db = client.db('bot');
                var extractedID = msg.mentions.users.array()[0].id;
                db.collection('users').findOne({
                    "_id": extractedID
                }, function (err, results) {
                    if (results == null || results.feh == "-1") {
                        msg.channel.send({
                            embed: {
                                color: 0x86D0CF,
                                author: {
                                    name: msg.guild.members.get(extractedID).user.username,
                                    icon_url: msg.guild.members.get(extractedID).user.avatarURL
                                },
                                title: "Fire Emblem Heroes Code",
                                description: "This user has not entered their code.",
                                thumbnail: {
                                    url: "https://github.com/alexsmbaratti/RosalinaBot/raw/indev/misc/icon_feh.png"
                                },
                                footer: {
                                    text: "They must set it up with `r!feh XXXXXXXXXX`"
                                }
                            }
                        });
                        console.log(`✅ Fire Emblem Heroes Code saved for ` + msg.author.username);
                    } else {
                        msg.channel.send({
                            embed: {
                                color: 0x86D0CF,
                                author: {
                                    name: msg.guild.members.get(extractedID).user.username,
                                    icon_url: msg.guild.members.get(extractedID).user.avatarURL
                                },
                                title: "Fire Emblem Heroes Code",
                                thumbnail: {
                                    url: "https://github.com/alexsmbaratti/RosalinaBot/raw/indev/misc/icon_feh.png"
                                },
                                description: results.feh
                            }
                        });
                    }
                });
                client.close();
            });
        } else if (argument == "clear") {
            MongoClient.connect(url, function (err, client) {
                var db = client.db('bot');
                db.collection('users').updateOne({
                    "_id": msg.author.id
                }, {
                    $set: {
                        "feh": "-1"
                    }
                });
                client.close();
                msg.reply("Your Fire Emblem Heroes friend code has been removed from my knowledge.");
            });
        } else if (argument == "") {
            MongoClient.connect(url, function (err, client) {
                var db = client.db('bot');
                db.collection('users').findOne({
                    "_id": msg.author.id
                }, function (err, results) {
                    if (results == null || results.feh == "-1") {
                        msg.channel.send({
                            embed: {
                                color: 0x86D0CF,
                                author: {
                                    name: msg.author.username,
                                    icon_url: msg.author.avatarURL
                                },
                                title: "Fire Emblem Heroes Code",
                                description: "You have not entered a code.",
                                thumbnail: {
                                    url: "https://github.com/alexsmbaratti/RosalinaBot/raw/indev/misc/icon_feh.png"
                                },
                                footer: {
                                    text: "You can set it up with `r!feh XXXXXXXXXX`"
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
                                title: "Fire Emblem Heroes Code",
                                thumbnail: {
                                    url: "https://github.com/alexsmbaratti/RosalinaBot/raw/indev/misc/icon_feh.png"
                                },
                                description: results.feh
                            }
                        });
                    }
                });
                client.close();
            });
        } else {
            if (validateCode(argument)) {
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
                                "feh": argument
                            }
                        });

                        client.close();
                        msg.channel.send({
                            embed: {
                                color: 0x86D0CF,
                                author: {
                                    name: "Code Saved!",
                                    icon_url: msg.author.avatarURL
                                },
                                title: "Fire Emblem Heroes Code",
                                description: argument.toUpperCase(),
                                thumbnail: {
                                    url: "https://github.com/alexsmbaratti/RosalinaBot/raw/indev/misc/icon_feh.png"
                                }
                            }
                        });
                    });
                })
            } else {
                msg.channel.send(":x: Invalid usage!");
            }
        }
        new UpdateFEHCodes();
    }
}

function validateCode(code) {
    if (code.length == 10) {
        return true;
    } else {
        return false;
    }
}


module.exports = FireEmblemHeroes;
