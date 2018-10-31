var AWS = require("aws-sdk");
AWS.config.loadFromPath('./config.json');
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
        }, ],
        Unit: 'None',
        Value: members
      }, ],
      Namespace: 'RosalinaBot'
    };

    cw.putMetricData(params, function(err, data) {
      if (err) {
        console.log("⛈  CloudWatch Put Error: ", err);
      } else {
        console.log("☁️  Put " + members + " members to CloudWatch");
      }
    });
  }
}

module.exports = UpdateServerMembers;
