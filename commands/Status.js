class Status {
  constructor(msg) {
    super(msg);
    if (msg.author.id == config.alexID) { // Admin only command
      // Status, build, ping, codes, mongoDB, CloudWatch, DBL, Pokedex, SMM, CPU Usage
      // Pass in "this" from app.js
    }
  }
}

module.exports = Status;
