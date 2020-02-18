const Command = require('./Command.js');
const CreateUser = require('./CreateUser.js');

const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';

// Example: r!pokemonHome
// Example: r!pokemonHome @USER
// Example: r!pokemonHome clear
// Example: r!pokemonHome XXXXXXXXXXXX

class PokemonHomeCode extends Command {
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
                    if (results == null || results.pokemonHome == "-1") {
                        try {
                            msg.channel.send({
                                embed: {
                                    color: 0x86D0CF,
                                    author: {
                                        name: msg.guild.members.get(extractedID).user.username,
                                        icon_url: msg.guild.members.get(extractedID).user.avatarURL
                                    },
                                    title: "Pokémon Home Friend Code",
                                    description: "This user has not entered their code.",
                                    footer: {
                                        text: "They must set it up with `r!pokemonHome XXXXXXXXXXXX`"
                                    }
                                }
                            });
                        } catch (e) {
                            msg.channel.send("Unable to complete this request. The error is currently under investigation.");
                            console.log("BAD POGO CODE");
                            console.log("ID: " + extractedID);
                            console.log(e);
                        }
                        console.log(`✅ Pokémon Home Code saved for ` + msg.author.username);
                    } else {
                        if (results.poGoPrivacy == "PUBLIC") {
                            try {
                                msg.channel.send("**" + msg.guild.members.get(extractedID).user.username + "'s Pokémon Home Friend Code**");
                                msg.channel.send(results.pokemonHome);
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
                                    title: "Pokémon Home Friend Code",
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
            MongoClient.connect(url, function (err, client) {
                var db = client.db('bot');
                db.collection('users').updateOne({
                    "_id": msg.author.id
                }, {
                    $set: {
                        "pokemonHome": "-1"
                    }
                });
                client.close();
                msg.reply("Your Pokémon Home friend code has been removed from my knowledge.");
            });
        } else if (argument == "") {
            MongoClient.connect(url, function (err, client) {
                var db = client.db('bot');
                db.collection('users').findOne({
                    "_id": msg.author.id
                }, function (err, results) {
                    if (results == null || results.pokemonHome == "-1") {
                        msg.channel.send({
                            embed: {
                                color: 0x86D0CF,
                                author: {
                                    name: msg.author.username,
                                    icon_url: msg.author.avatarURL
                                },
                                title: "Pokémon Home Friend Code",
                                description: "You have not entered a code.",
                                footer: {
                                    text: "You can set it up with `r!pokemonHome XXXX XXXX XXXX`"
                                }
                            }
                        });
                    } else {
                        msg.channel.send("**" + msg.author.username + "'s Pokémon Home Friend Code**");
                        msg.channel.send(results.pokemonHome);
                    }
                });
                client.close();
            });
        } else {
            if (validateCode(msg.content.substring(14))) { // Cuts off r!pokemonHome command
                var code = msg.content.substring(14);
                console.log(code);
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
                                "pokemonHome": code
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
                                title: "Pokémon Home Friend Code",
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
    }
}

function validateCode(code) {
    if (code.substring(0, 3) != "SW-") {
        if (code.length == 12) {
            return true;
        } else {
            return false;
        }
    }
}

module.exports = PokemonHomeCode;
