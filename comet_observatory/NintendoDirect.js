var config = require('../config.json');
const iCal = require(`ical.js`);
const fs = require(`fs`);
var request = require('request');
var calendarUrl = 'webcal://nintendo.cal.events/Sh0TE6.ics';
const Logger = require('../utils/Logger.js');
var options = {
  url: calendarUrl.replace('webcal://', 'https://'),
  gzip: true
};
const color = 0x86D0CF;

class NintendoDirect {
  constructor(client) {
    // Download fresh version of ICS file
    request(options, function(error, response, icalData) {
      new Logger("Nintendo Direct Calendar Response: " + response.statusCode);
      let jcalData = ICAL.parse(icalData);
      let vcalendar = new iCal.Component(jcalData);
      let allSubcomponents = vcalendar.getAllSubcomponents();
      var recent = new Date(1);

      // Finds event with latest date (supposedly a new event)
      var event;
      allSubcomponents.forEach(e => {
        let title = e.getFirstPropertyValue(`summary`);
        let date = e.getFirstPropertyValue(`dtstart`);
        if (!(title.startsWith("Reminder:"))) { // Remove all events with reminders
          // console.log(title);
          var current = new Date(date.year, date.month - 1, date.day, date.hour, date.minute, 0, 0);
          // console.log("Current: " + current);
          if (recent < current) {
            recent = current;
            event = e;
            // console.log("Recent: " + recent);
          }
        }
      });

      let lastUpdate = fs.readFileSync('lastEvent.dat', 'utf8');
      if (lastUpdate == recent) {
        console.log("No change");
      } else {
        if (lastUpdate > recent) { // Prevents overridding latest date with an old Direct
          console.log("New Nintendo Direct detected!");
          console.log(lastUpdate);
          console.log(recent);

          // Example URL: https://www.nintendo.com/nintendo-direct/11-01-2018/images/archive-thumb.jpg
          let thumb_url = "https://www.nintendo.com/nintendo-direct/";
          if ((recent.getMonth() + 1) < 10) {
            thumb_url += ("0" + (recent.getMonth() + 1));
          } else {
            thumb_url += (recent.getMonth() + 1);
          }
          thumb_url += "-";

          if ((recent.getDate()) < 10) {
            thumb_url += ("0" + (recent.getDate()));
          } else {
            thumb_url += (recent.getDate());
          }
          thumb_url += "-" + recent.getFullYear() + "/images/archive-thumb.jpg";

          client.channels.get(config.COMET_OBSERVATORY_ANNOUNCE).send({
            embed: {
              author: {
                name: "Nintendo Direct Announced!"
              },
              title: event.getFirstPropertyValue(`summary`),
              url: event.getFirstPropertyValue('url'),
              "image": {
                "url": thumb_url
              },
              color: color,
              description: "Airing on " + (recent.getMonth() + 1) + "/" + recent.getDate() + " at " + recent.getHours() + ":00 (UTC)"
            }
          });
          fs.writeFileSync('lastEvent.dat', recent);
        }
      }
    });
  }
}

module.exports = NintendoDirect;
