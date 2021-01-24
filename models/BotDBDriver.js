const MongoClient = require('mongodb').MongoClient;

function BotDBDriver(uri, db) {
    BotDBDriver.prototype.uri = uri;
    BotDBDriver.prototype.db = db;
}

BotDBDriver.prototype.updateUser = function (id, options = {}) {
    let set = {$set: options}
    let client = new MongoClient(BotDBDriver.prototype.uri, {useNewUrlParser: true, useUnifiedTopology: true});
    return new Promise(function (resolve, reject) {
        client.connect(err => {
            if (err) {
                reject(err);
                client.close();
            } else {
                client.db(BotDBDriver.prototype.db).collection('users').updateOne({_id: {$eq: id}}, set, {upsert: true}, function (err, res) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(res);
                    }
                    client.close();
                });
            }
        });
    });
}

BotDBDriver.prototype.getUser = function (id) {
    let client = new MongoClient(BotDBDriver.prototype.uri, {useNewUrlParser: true, useUnifiedTopology: true});
    return new Promise(function (resolve, reject) {
        client.connect(err => {
            if (err) {
                reject(err);
                client.close();
            } else {
                client.db(BotDBDriver.prototype.db).collection('users').findOne({_id: {$eq: id}}, function (err, res) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(res);
                    }
                    client.close();
                });
            }
        });
    });
}

module.exports = BotDBDriver;