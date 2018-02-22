class Command {

  var message;
  var params;
  constructor(msg) {
    message = msg.content;
    params = message.split(" "); // Splits message content into separate parseable strings
  }

}
