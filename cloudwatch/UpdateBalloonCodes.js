var AWS = require("aws-sdk");
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
AWS.config.loadFromPath('./config.json');
const Logger = require('../utils/Logger.js');
var cw = new AWS.CloudWatch({
  apiVersion: '2010-08-01'
});

class UpdateBalloonCodes { // There is probably a better way to do this
  constructor() {
    var num = 0;
    MongoClient.connect(url, function(err, client) {
      var db = client.db('bot');
      db.collection('users').count({
        bowser: {
          $ne: "-1"
        }
      }, function(err, results) {
        num += results;
        client.close();
        MongoClient.connect(url, function(err, client) {
          var db = client.db('bot');
          db.collection('users').count({
            cascade: {
              $ne: "-1"
            }
          }, function(err, results) {
            num += results;
            client.close();
            MongoClient.connect(url, function(err, client) {
              var db = client.db('bot');
              db.collection('users').count({
                lake: {
                  $ne: "-1"
                }
              }, function(err, results) {
                num += results;
                client.close();
                MongoClient.connect(url, function(err, client) {
                  var db = client.db('bot');
                  db.collection('users').count({
                    lost: {
                      $ne: "-1"
                    }
                  }, function(err, results) {
                    num += results;
                    client.close();
                    MongoClient.connect(url, function(err, client) {
                      var db = client.db('bot');
                      db.collection('users').count({
                        luncheon: {
                          $ne: "-1"
                        }
                      }, function(err, results) {
                        num += results;
                        client.close();
                        MongoClient.connect(url, function(err, client) {
                          var db = client.db('bot');
                          db.collection('users').count({
                            metro: {
                              $ne: "-1"
                            }
                          }, function(err, results) {
                            num += results;
                            client.close();
                            MongoClient.connect(url, function(err, client) {
                              var db = client.db('bot');
                              db.collection('users').count({
                                moon: {
                                  $ne: "-1"
                                }
                              }, function(err, results) {
                                num += results;
                                client.close();
                                MongoClient.connect(url, function(err, client) {
                                  var db = client.db('bot');
                                  db.collection('users').count({
                                    mushroom: {
                                      $ne: "-1"
                                    }
                                  }, function(err, results) {
                                    num += results;
                                    client.close();
                                    MongoClient.connect(url, function(err, client) {
                                      var db = client.db('bot');
                                      db.collection('users').count({
                                        sand: {
                                          $ne: "-1"
                                        }
                                      }, function(err, results) {
                                        num += results;
                                        client.close();
                                        MongoClient.connect(url, function(err, client) {
                                          var db = client.db('bot');
                                          db.collection('users').count({
                                            seaside: {
                                              $ne: "-1"
                                            }
                                          }, function(err, results) {
                                            num += results;
                                            client.close();
                                            MongoClient.connect(url, function(err, client) {
                                              var db = client.db('bot');
                                              db.collection('users').count({
                                                snow: {
                                                  $ne: "-1"
                                                }
                                              }, function(err, results) {
                                                num += results;
                                                client.close();
                                                MongoClient.connect(url, function(err, client) {
                                                  var db = client.db('bot');
                                                  db.collection('users').count({
                                                    wooded: {
                                                      $ne: "-1"
                                                    }
                                                  }, function(err, results) {
                                                    num += results;
                                                    client.close();
                                                    var params = {
                                                      MetricData: [{
                                                        MetricName: 'Balloon World Codes Managed',
                                                        Dimensions: [{
                                                          Name: 'Statistics',
                                                          Value: 'Codes'
                                                        }, ],
                                                        Unit: 'None',
                                                        Value: num
                                                      }, ],
                                                      Namespace: 'RosalinaBot'
                                                    };

                                                    cw.putMetricData(params, function(err, data) {
                                                      if (err) {
                                                        new Logger("\x1b[31mFailed to put Balloon World codes to CloudWatch!\x1b[0m");
                                                      } else {
                                                        new Logger(`\x1b[32mPut ` + num + ` Balloon World codes to CloudWatch\x1b[0m`);
                                                      }
                                                    });
                                                  });
                                                });
                                              });
                                            });
                                          });
                                        });
                                      });
                                    });
                                  });
                                });
                              });
                            });
                          });
                        });
                      });
                    });
                  });
                });
              });
            });
          });
        });
      });
    });
  }
}

module.exports = UpdateBalloonCodes;
