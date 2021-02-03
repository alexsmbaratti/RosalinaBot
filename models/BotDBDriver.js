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

BotDBDriver.prototype.getCode = function (id, codeName, isSelfCall) {
    let client = new MongoClient(BotDBDriver.prototype.uri, {useNewUrlParser: true, useUnifiedTopology: true});
    return new Promise(function (resolve, reject) {
        client.connect(err => {
            if (err) {
                reject(err);
                client.close();
            } else {
                client.db(BotDBDriver.prototype.db).collection('users').findOne({_id: {$eq: id}}, function (err, res) {
                    if (err) {
                        console.log(res);
                        reject(err);
                    } else {
                        let document = {_id: res._id}
                        if (res[codeName]) {
                            if (res[codeName].public || isSelfCall) {
                                document[codeName] = res[codeName];
                            } else {
                                document[codeName] = {code: "This code is private", public: false}
                            }
                        } else {
                            document[codeName] = {code: "This code has not been set", public: false}
                        }
                        resolve(document);
                    }
                    client.close();
                });
            }
        });
    });
}

BotDBDriver.prototype.setCode = function (id, codeName, code, public = true) {
    let set = {};
    switch (codeName) {
        case 'switch':
            set = {
                $set: {
                    switch: {
                        code: code,
                        public: public
                    }
                }
            }
            break;
        case 'ds':
            set = {
                $set: {
                    ds: {
                        code: code,
                        public: public
                    }
                }
            }
            break;
        case 'pogo':
            set = {
                $set: {
                    pogo: {
                        code: code,
                        public: public
                    }
                }
            }
            break;
        case 'feh':
            set = {
                $set: {
                    feh: {
                        code: code,
                        public: public
                    }
                }
            }
            break;
        case 'mkt':
            set = {
                $set: {
                    mkt: {
                        code: code,
                        public: public
                    }
                }
            }
            break;
        default:
    }

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

module.exports = BotDBDriver;