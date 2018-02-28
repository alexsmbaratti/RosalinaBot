var AWS = require("aws-sdk");
AWS.config.loadFromPath('./config.json');
var cw = new AWS.CloudWatch({
  apiVersion: '2010-08-01'
});

class Update3DSCodes {
  constructor(numCodes) {
    var params = {
      MetricData: [{
        MetricName: 'Nintendo 3DS Codes Managed',
        Dimensions: [{
          Name: 'Statistics',
          Value: 'Codes'
        }, ],
        Unit: 'None',
        Value: numCodes
      }, ],
      Namespace: 'RosalinaBot'
    };

    cw.putMetricData(params, function(err, data) {
      if (err) {
        console.log("⛈  CloudWatch Put Error: ", err);
      } else {
        console.log("☁️  CloudWatch Put Success!");
      }
    });
  }
}

module.exports = Update3DSCodes;
