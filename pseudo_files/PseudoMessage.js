const PseudoUser = require('./PseudoUser.js');
const PseudoChannel = require('./PseudoChannel.js');

var identifier = -1;
var type = "DEFAULT";
var content = "";
var author;
var pinned = false;
var tts = false;
var channel = new PseudoChannel();

class PseudoMessage {
  constructor(message) {
    content = message;
    author = new PseudoUser();
  }

  get content() {
    return content;
  }

  get id() {
    return identifier;
  }

  get author() {
    return author;
  }

  get channel() {
    return channel;
  }

  reply(content) { // Does nothing
  }
}

module.exports = PseudoMessage;
