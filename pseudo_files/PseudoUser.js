var identifier = -1;
var username = "test";
var bot = false;

class PseudoUser {
  constructor() {
  }

  get id() {
    return identifier;
  }

  get username() {
    return username;
  }

  get avatarURL() {
    return "https://github.com/alexsmbaratti/RosalinaBot/blob/master/misc/icon_earth.png";
  }
}

module.exports = PseudoUser;
