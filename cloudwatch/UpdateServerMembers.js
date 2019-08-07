var AWS = require("aws-sdk");
AWS.config.loadFromPath('./config.json');
const Logger = require('../utils/Logger.js');
var cw = new AWS.CloudWatch({
    apiVersion: '2010-08-01'
});

class UpdateServerMembers {
    constructor(members) {
        var params = {
            MetricData: [{
                MetricName: 'Support Server Members',
                Dimensions: [{
                    Name: 'Statistics',
                    Value: 'members'
                },],
                Unit: 'None',
                Value: members
            },],
            Namespace: 'RosalinaBot'
        };

        cw.putMetricData(params, function (err, data) {
            if (err) {
                new Logger("\x1b[31mFailed to put members to CloudWatch!\x1b[0m");
            } else {
                new Logger(`\x1b[32mPut ` + members + ` members to CloudWatch\x1b[0m`);
            }
        });
    }
}

module.exports = UpdateServerMembers;
