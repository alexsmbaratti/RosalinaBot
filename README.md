# RosalinaBot
**A Discord Bot for Nintendo fans**

[![Add to Discord](https://img.shields.io/badge/add%20to-Discord-7289DA.svg "Add to Discord")](https://discordapp.com/oauth2/authorize?client_id=322405544490958849&permissions=0&scope=bot) [![Build Status](https://travis-ci.org/alexsmbaratti/RosalinaBot.svg?branch=master)](https://travis-ci.org/alexsmbaratti/RosalinaBot) [![Version](https://img.shields.io/badge/version-7.6.1-brightgreen.svg "Version")](https://github.com/alexsmbaratti/RosalinaBot/releases) [![Library](https://img.shields.io/badge/lib-discord.js-blue.svg "Discord.js")](https://discord.js.org/) [![Server Count](https://discordbots.org/api/widget/servers/322405544490958849.svg?noavatar=true)](https://discordbots.org/bot/322405544490958849) [![Discord Bots](https://discordbots.org/api/widget/status/322405544490958849.svg?noavatar=true)](https://discordbots.org/bot/322405544490958849)

<a href="https://discordbotlist.com/bots/322405544490958849">
    <img 
        width="380" 
        height="140" 
        src="https://discordbotlist.com/bots/322405544490958849/widget" 
        alt="Rosalina stats on Discord Bot List">
</a>

RosalinaBot keeps tracks of your friends' Nintendo friend codes through Discord! Equipped with a coin, a dice, and communication with the stars (*definitely*) for maximum obligatory bot features.

![alt text](https://github.com/alexsmbaratti/RosalinaBot/raw/indev/misc/art.png)

## Features
* Support for Nintendo Switch and Nintendo 3DS Friend Codes
  * Send and receive your Nintendo Switch and Nintendo 3DS friend codes with your Discord friends
* Share Super Mario Odyssey Balloon Codes
  * Store your Luigi's Balloon World codes and challenge your friends on Discord to find them
* Share Pokémon Go friend codes
  * Catch them all with your friends!
* Share Super Smash Bros. Ultimate Battle Arenas
  * Settle it in Smash with your Discord server!
* Friend codes transfer between servers
* Dice
  * Use `r!dice` or `r!die` to roll a die. A great alternative to settling it in Smash!
* Coin Flipping
  * Use `r!coin` to flip a coin. Who knows? Maybe it'll land on its side!
* 8 Ball
  * Use `r!8ball [Yes or No Question]` to seek answers from the cosmos.
* 24/7 uptime (Note: Due to maintainance and restarts, you may experience some downtime.)
* Command shortcuts
* Privacy Settings
  * Customize whether your friends can request your individual friend codes.
    * (The alternative is you sending your code to chat yourself.)

## Instructions
### Sharing friend codes
To share your friend code with people in your server, or just keep it handy on Discord, use either `r!switchCode` or `r!3DSCode` to store your Nintendo Switch friend code or Nintendo 3DS friend code respectively. You can also use the `r!sc` or `r!ds` shortcut commands instead. Example usage is below for both commands.

`r!switchCode SW-1234-5678-9000`
`r!3DSCode 1234-5678-9000`

Note that dashes are required and the commands are not case sensitive. You should receive a confirmation message if it is successful. By default, your friend codes are public. In order for others to see them, you must type `r!switchCode` or `r!3DSCode` to retrieve your friend codes. If you set your friend codes to public, others in a server with RosalinaBot may use `r!switchCode @[YOU]` or `r!3DSCode @[YOU]` to retrieve your friend codes.

To learn more about this command, use `r!help sc` or `r!help ds`.

### Sharing Super Smash Bros. Ultimate Battle Arenas
To share a Super Smash Bros. Ultimate Battle Arena with your channel, use the `r!ssbu` command to post it. You can either choose to share a Battle Arena ID, or share that your Battle Arena is open to friends. Example usage is below for both instances.

`r!ssbu 12345`
`r!ssbu friend`

If you have a password on your Battle Arena, add it to the end of the command, like the example below.

`r!ssbu 12345 PASSWORD`

To learn more about this command, use `r!help ssbu`.
