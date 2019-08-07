var AWS = require("aws-sdk");
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
AWS.config.loadFromPath('./config.json');
const Logger = require('../utils/Logger.js');
var cw = new AWS.CloudWatch({
    apiVersion: '2010-08-01'
});

class UpdatePoGoCodes {
    constructor() {
        var num;
        MongoClient.connect(url, function (err, client) {
            var db = client.db('bot');
            db.collection('users').count({
                poGoCode: {
                    $ne: "-1"
                }
            }, function (err, results) {
                num = results;
                client.close();
                var params = {
                    MetricData: [{
                        MetricName: 'Pokemon Go Codes Managed',
                        Dimensions: [{
                            Name: 'Statistics',
                            Value: 'Codes'
                        },],
                        Unit: 'None',
                        Value: num
                    },],
                    Namespace: 'RosalinaBot'
                };

                cw.putMetricData(params, function (err, data) {
                    if (err) {
                        new Logger("\x1b[31mFailed to put Pokemon Go friend codes to CloudWatch!\x1b[0m");
                    } else {
                        new Logger(`\x1b[32mPut ` + num + ` Pokemon Go friend codes to CloudWatch\x1b[0m`);
                    }
                });
            });
        });
    }
}

module.exports = UpdatePoGoCodes;
