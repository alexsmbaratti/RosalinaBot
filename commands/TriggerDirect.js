var config = require('../config.json');
const iCal = require(`ical.js`);
const fs = require(`fs`);
var request = require('request');
var calendarUrl = 'webcal://nintendo.cal.events/Sh0TE6.ics';
var options = {
  url: calendarUrl.replace('webcal://', 'https://'),
  gzip: true
};
const color = 0x86D0CF;
var utc = 0;
var timezone = "UTC";

class TriggerDirect {
  constructor(client, msg) {
      // Example URL: https://www.nintendo.com/nintendo-direct/11-01-2018/images/archive-thumb.jpg
      let thumb_url = "https://pbs.twimg.com/media/ERFw7S7VAAAFi62?format=jpg&name=large";

      msg.channel.send({
        embed: {
          author: {
            name: "Latest Nintendo Direct"
          },
          title: "Nintendo Direct Mini",
          "image": {
            "url": thumb_url
          },
          color: color,
          description: "Aired on March 26"
        }
      });
  }
}

module.exports = TriggerDirect;
