const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';

class Command {
  constructor(msg) {
  	 MongoClient.connect(url, function(err, client) {
      var db = client.db('bot');
      db.collection('commands').insertOne({
        author: msg.author.id,
        message: msg.content
      }, function(err, results) {})
    })
  }
}

module.exports = Command;
