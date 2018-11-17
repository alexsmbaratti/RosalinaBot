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
    // Download fresh version of ICS file
    request(options, function(error, response, icalData) {
      console.log("Response: " + response.statusCode);
      let jcalData = ICAL.parse(icalData);
      let vcalendar = new iCal.Component(jcalData);
      let allSubcomponents = vcalendar.getAllSubcomponents();
      var recent = new Date(1);

      switch (msg.guild.region) { // For timezones
        case "us-west":
          utc = -8;
          timezone = "PST";
          break;
        case "us-east":
          utc = -5;
          timezone = "EST";
          break;
        case "us-central":
          utc = -6;
          timezone = "CST";
          break;
        default:
      }

      // Finds event with latest date (supposedly a new event)
      var event;
      allSubcomponents.forEach(e => {
        let title = e.getFirstPropertyValue(`summary`);
        let date = e.getFirstPropertyValue(`dtstart`);
        if (!(title.startsWith("Reminder:"))) { // Remove all events with reminders
          console.log(title);
          var current = new Date(date.year, date.month - 1, date.day, date.hour + utc, date.minute, 0, 0);
          console.log("Current: " + current);
          if (recent < current) {
            recent = current;
            event = e;
            console.log("Recent: " + recent);
          }
        }
      });

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

      msg.channel.send({
        embed: {
          author: {
            name: "Latest Nintendo Direct"
          },
          title: event.getFirstPropertyValue(`summary`),
          url: event.getFirstPropertyValue('url'),
          "image": {
            "url": thumb_url
          },
          color: color,
          description: "Aired on " + (recent.getMonth() + 1) + "/" + recent.getDate() + " at " + recent.getHours() + ":00 (" + timezone + ")"
        }
      });
    });
  }
}

module.exports = TriggerDirect;
