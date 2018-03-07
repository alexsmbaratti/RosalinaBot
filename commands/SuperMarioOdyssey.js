const Command = require('./Command.js');

// r!smo mushroom XXX-XXX-XXX

/* Applicable Kingdoms:
* Cap Kingdom
* Cascade Kingdom
* Sand Kingdom
* Wooded Kingdom
* Lake Kingdom
* Lost Kingdom
* Metro Kingdom
* Snow Kingdom
* Seaside Kingdom
* Luncheon Kingdom
* Bowser's Kingdom
* Moon Kingdom
* Mushroom Kingdom
*/

class SuperMarioOdyssey extends Command {
  constructor(msg) {
    super(msg);
    try {
      var arg1 = msg.content.split(" ")[1].toLowerCase();
      var arg2 = msg.content.split(" ")[2].toLowerCase();
    } catch (e) {
      if (arg1 == null) {
        arg1 = "";
      }
      if (arg2 == null) {
        arg2 = "";
      }
    }
  }
}

module.exports = SuperMarioOdyssey;
