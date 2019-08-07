var AWS = require("aws-sdk");
AWS.config.loadFromPath('./config.json');
const Logger = require('../utils/Logger.js');
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
        new Logger("\x1b[31mFailed to put guilds to CloudWatch!\x1b[0m");
      } else {
        new Logger(`\x1b[32mPut ` + guilds + ` Nintendo Switch friend codes to CloudWatch\x1b[0m`);
      }
    });
  }
}

module.exports = UpdateGuilds;
