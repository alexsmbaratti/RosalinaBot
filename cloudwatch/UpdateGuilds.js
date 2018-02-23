var AWS = require("aws-sdk");
AWS.config.loadFromPath('./config.json');
var cw = new AWS.CloudWatch({
  apiVersion: '2010-08-01'
});

class UpdateGuilds {
  constructor(guilds) {
    var params = {
      MetricData: [{
        MetricName: 'Guilds Serving',
        Dimensions: [{
          Name: 'Statistics',
          Value: 'Guilds'
        }, ],
        Unit: 'None',
        Value: guilds
      }, ],
      Namespace: 'RosalinaBot'
    };

    cw.putMetricData(params, function(err, data) {
      if (err) {
        console.log("Error", err);
      } else {
        console.log("Success", data);
      }
    });
  }
}

module.exports = UpdateGuilds;
