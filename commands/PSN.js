const Command = require('./Command.js');
const CreateUser = require('./CreateUser.js');

const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';

var color = 0x86D0CF;

// Example: r!psn
// Example: r!psn @USER
// Example: r!psn clear
// Example: r!psn XXXXXXXXXX

class PSN extends Command {
    constructor(msg) {
        super(msg);
        var argument;
        try {
            argument = msg.content.split(" ")[1];
        } catch (e) {
            argument = "";
        }

        if (argument == undefined) {
            argument = "";
        }

        if (msg.mentions.everyone == false && msg.mentions.users.array()[0] != null) {
            MongoClient.connect(url, function (err, client) {
                var db = client.db('bot');
                var extractedID = msg.mentions.users.array()[0].id;
                db.collection('users').findOne({
                    "_id": extractedID
                }, function (err, results) {
                    if (results == null || results.psn == "-1") {
                        msg.channel.send({
                            embed: {
                                color: 0x86D0CF,
                                author: {
                                    name: msg.guild.members.get(extractedID).user.username,
                                    icon_url: msg.guild.members.get(extractedID).user.avatarURL
                                },
                                title: "PlayStation Network ID",
                                description: "This user has not entered their tag.",
                                footer: {
                                    text: "They must set it up with `r!psn [ID]`"
                                },
                                thumbnail: {
                                    url: "https://github.com/alexsmbaratti/RosalinaBot/raw/indev/misc/icon_psn.png"
                                }
                            }
                        });
                        console.log(`✅ PSN ID saved for ` + msg.author.username);
                    } else {
                        msg.channel.send({
                            embed: {
                                color: 0x86D0CF,
                                author: {
                                    name: msg.guild.members.get(extractedID).user.username,
                                    icon_url: msg.guild.members.get(extractedID).user.avatarURL
                                },
                                title: "PlayStation Network ID",
                                description: results.psn,
                                thumbnail: {
                                    url: "https://github.com/alexsmbaratti/RosalinaBot/raw/indev/misc/icon_psn.png"
                                }
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
                        "psn": "-1"
                    }
                });
                client.close();
                msg.reply("Your PlayStation Network ID has been removed from my knowledge.");
            });
        } else if (argument == "") {
            MongoClient.connect(url, function (err, client) {
                var db = client.db('bot');
                db.collection('users').findOne({
                    "_id": msg.author.id
                }, function (err, results) {
                    if (results == null || results.psn == "-1") {
                        msg.channel.send({
                            embed: {
                                color: 0x86D0CF,
                                author: {
                                    name: msg.author.username,
                                    icon_url: msg.author.avatarURL
                                },
                                title: "PlayStation Network ID",
                                description: "You have not entered a code.",
                                footer: {
                                    text: "You can set it up with `r!psn [ID]`"
                                },
                                thumbnail: {
                                    url: "https://github.com/alexsmbaratti/RosalinaBot/raw/indev/misc/icon_psn.png"
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
                                title: "PlayStation Network ID",
                                description: results.psn,
                                thumbnail: {
                                    url: "https://github.com/alexsmbaratti/RosalinaBot/raw/indev/misc/icon_psn.png"
                                }
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
                                "psn": argument
                            }
                        });

                        client.close();
                        msg.channel.send({
                            embed: {
                                color: 0x86D0CF,
                                author: {
                                    name: "ID Saved!",
                                    icon_url: msg.author.avatarURL
                                },
                                title: "PlayStation Network ID",
                                description: argument,
                                thumbnail: {
                                    url: "https://github.com/alexsmbaratti/RosalinaBot/raw/indev/misc/icon_psn.png"
                                }
                            }
                        });
                    });
                })
            } else {
                msg.channel.send(":x: Invalid usage!");
            }
        }
    }
}

function validateCode(code) {
    return true;
}


module.exports = PSN;
