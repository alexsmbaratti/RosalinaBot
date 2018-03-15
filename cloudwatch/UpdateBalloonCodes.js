var AWS = require("aws-sdk");
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const url = 'mongodb://localhost:27017';
AWS.config.loadFromPath('./config.json');
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
                                                        console.log("⛈  CloudWatch Put Error: ", err);
                                                      } else {
                                                        console.log("☁️  Put " + num + " Balloon World codes to CloudWatch");
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
