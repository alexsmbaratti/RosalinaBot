var config = require('../config.json');
const iCal = require(`ical.js`);
const fs = require(`fs`);
var request = require('request');
var calendarUrl = 'webcal://nintendo.cal.events/SNvEkC.ics';
var options = {
  url: calendarUrl.replace('webcal://', 'https://'),
  gzip: true
};
const color = 0x86D0CF;

class NintendoDirect {
  constructor(client) {
    // Download fresh version of ICS file
    request(options, function(error, response, icalData) {
      console.log("Response: " + response.statusCode);
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
          console.log(title);
          var current = new Date(date.year, date.month - 1, date.day, date.hour, date.minute, 0, 0);
          console.log("Current: " + current);
          if (recent < current) {
            recent = current;
            event = e;
            console.log("Recent: " + recent);
          }
        }
      });

      try {
        let lastUpdate = fs.readFileSync('lastEvent.dat', 'utf8');
      } catch (e) {
        fs.writeFileSync('lastEvent.dat', "");
      }
      if (lastUpdate == recent) {
        console.log("No change");
      } else {
        console.log("New Nintendo Direct detected!");
        console.log(lastUpdate);
        console.log(recent);

        client.channels.get(config.COMET_OBSERVATORY_ANNOUNCE).send({
          embed: {
            author: {
              name: "Nintendo Direct Announced!"
            },
            title: e.getFirstPropertyValue(`summary`),
            url: e.getFirstPropertyValue('url'),
            color: color,
            description: "Airing on " + recent.getMonth() + " " + recent.getDate() + " at " + recent.getHours() + ":" + recent.getMinutes()
          }
        });
        fs.writeFileSync('lastEvent.dat', recent);
      }
    });
  }
}

module.exports = NintendoDirect;
