const RED = "\x1b[31m";
const ORANGE = "\x1b[33m";
const BLUE = "\x1b[34m";
const PINK = "\x1b[35m";
const RESET = "\x1b[0m";

class Logger {
    constructor(msg) {
        var time = new Date().toLocaleTimeString();
        console.log("[ " + time + " ] " + msg);
    }
}

module.exports = Logger;
