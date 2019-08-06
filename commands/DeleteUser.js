const Command = require('../commands/Command.js');
const Logger = require('../utils/Logger.js');

const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';

class DeleteUser extends Command {
    constructor(msg) {
        super(msg);
        MongoClient.connect(url, function (err, client) {
            var db = client.db('bot');
            db.collection('users').findOne({
                _id: msg.author.id
            }, function (err, results) {
                if (results == null) {
                    msg.reply("you do not appear to have any records saved.");
                } else {
                    db.collection('users').deleteOne({
                        "_id": msg.author.id
                    });
                    msg.reply("your records have been fully erased.");
                    new Logger("\x1b[32mUser " + msg.author.id + " deleted from database successfully!\x1b[0m");
                }
                client.close();
            });
        })
    }
}

module.exports = DeleteUser;
