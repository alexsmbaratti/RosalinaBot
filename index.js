const starbit = require('@alexsmbaratti/Starbit');
const Discord = require('discord.js');
const MongoDBDriver = require('@alexsmbaratti/Starbit/models/MongoDBDriver');
const config = require('./config.json');

var driver = new MongoDBDriver(config.db.uri, config.db.dbName, true, config.db.userCollection);

starbit.start(config.botToken, './bot/bot.js', {
    hostname: config.hostname,
    port: config.port,
    keyPath: config.keyPath,
    certificatePath: config.certificatePath,
    discordJSVersion: Discord.version,
    dbDriver: driver
});