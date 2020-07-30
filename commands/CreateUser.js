const Command = require('../commands/Command.js');
const Logger = require('../utils/Logger.js');

class CreateUser extends Command {
    constructor(msg, db) {
        super(msg);
        db.collection('users').insertOne({
            _id: msg.author.id,
            switchCode: "-1",
            dsCode: "-1",
            poGoCode: "-1",
            switchPrivacy: "PUBLIC",
            dsPrivacy: "PUBLIC",
            poGoPrivacy: "PUBLIC",
            bowser: "-1",
            cap: "-1",
            cascade: "-1",
            lake: "-1",
            lost: "-1",
            luncheon: "-1",
            metro: "-1",
            moon: "-1",
            mushroom: "-1",
            sand: "-1",
            seaside: "-1",
            snow: "-1",
            wooded: "-1",
            feh: "-1",
            drmario: "-1",
            mariokarttour: "-1",
            psn: "-1",
            xbox: "-1",
            ssbmain: -1,
            acpc: -1,
            pokemonHome: "-1",
            acnhIslandName: "",
            acnhFruit: -1,
            acnhDesigner: "",
            acnhDreamAdress: "",
            smm2: []
        }, function (error, response) {
            if (error) {
                new Logger("\x1b[31mFailed to add user " + msg.author.id + " to database!\x1b[0m");
            } else {
                new Logger("\x1b[32mUser " + msg.author.id + " added to database successfully!\x1b[0m");
            }
        });
    }
}

module.exports = CreateUser;
