# RosalinaBot
**A Discord Bot for Nintendo fans**

[![Add to Discord](https://img.shields.io/badge/add%20to-Discord-7289DA.svg "Add to Discord")](https://discordapp.com/oauth2/authorize?client_id=322405544490958849&permissions=0&scope=bot) [![Build Status](https://travis-ci.org/alexsmbaratti/RosalinaBot.svg?branch=master)](https://travis-ci.org/alexsmbaratti/RosalinaBot) [![Version](https://img.shields.io/badge/version-7.3.0-brightgreen.svg "Version")](https://github.com/alexsmbaratti/RosalinaBot/releases) [![Library](https://img.shields.io/badge/lib-discord.js-blue.svg "Discord.js")](https://discord.js.org/) [![Server Count](https://discordbots.org/api/widget/servers/322405544490958849.svg?noavatar=true)](https://discordbots.org/bot/322405544490958849) [![Discord Bots](https://discordbots.org/api/widget/status/322405544490958849.svg?noavatar=true)](https://discordbots.org/bot/322405544490958849)

RosalinaBot keeps tracks of your friends' Nintendo friend codes through Discord! Equipped with a coin, a dice, and communication with the stars (*definitely*) for maximum obligatory bot features.

![alt text](https://github.com/alexsmbaratti/RosalinaBot/raw/master/misc/art.png)

## Features
* Support for Nintendo Switch and Nintendo 3DS Friend Codes
  * Send and receive your Nintendo Switch and Nintendo 3DS friend codes with your Discord friends
* Share Super Mario Odyssey Balloon Codes
  * Store your Luigi's Balloon World codes and challenge your friends on Discord to find them
* Share Pokémon Go friend codes
  * Catch them all with your friends!
* Friend codes transfer between servers
* Dice
  * Use `r!dice` or `r!die` to roll a die. A great alternative to settling it in Smash!
* Coin Flipping
  * Use `r!coin` to flip a coin. Who knows? Maybe it'll land on its side!
* 8 Ball
  * Use `r!8ball [Yes or No Question]` to seek answers from the cosmos.
* Capable of notifying users when a Nintendo Direct is announced
  * Sent to the announcements channel of the [Comet Observatory](https://discordapp.com/invite/Tu82Bm7) support server.
* 24/7 uptime
  * (That's a feature, right?)
* Command shortcuts
* Privacy Settings
  * Customize whether your friends can request your individual friend codes.
    * (The alternative is you sending your code to chat yourself.)

## Instructions
### Sharing friend codes
To share your friend code with people in your server, or just keep it handy on Discord, use either `r!switchCode` or `r!3DSCode` to store your Nintendo Switch friend code or Nintendo 3DS friend code respectively. Example usage is below for both commands.

`r!switchCode SW-1234-5678-9000`
`r!3DSCode 1234-5678-9000`

Note that dashes are required and the commands are not case sensitive. You should receive a confirmation message if it is successful. By default, your friend codes are public. In order for others to see them, you must type `r!switchCode` or `r!3DSCode` to retrieve your friend codes. If you set your friend codes to public, others in a server with RosalinaBot may use `r!switchCode @[YOU]` or `r!3DSCode @[YOU]` to retrieve your friend codes.

### Privacy Settings
By default, any of your friend codes will be set to public. The only time RosalinaBot will send your friend codes to a chat is if you and only you use the `r!switchCode` or the `r!3DSCode` commands. To check these settings at anytime, use `r!settings`.

To change a privacy setting, follow this format `r!settings [PLATFORM]Code [PRIVACY]`. Replace `PLATFORM` with either `switch` or `3DS` and `PRIVACY` with either `PUBLIC` or `PRIVATE`. For example, typing `r!settings switchCode PUBLIC` will set your Nintendo Switch friend code to public. Likewise, typing `r!settings 3DSCode PRIVATE` will set your Nintendo 3DS friend code to private.

### Sharing Balloon World codes
You can share your Balloon World codes from Super Mario Odyssey using `r!smo`. The basic structure for saving a code is `r!smo [KINGDOM] 000000000`. `[KINGDOM]` should be replaced with one of the following:
* cap
* cascade
* sand
* lake
* wooded
* lost
* metro
* snow
* seaside
* luncheon
* bowser
* moon
* mushroom

Balloon World codes do not have privacy settings. They are public for other members to see. You can view another person's code by using `r!smo [KINGDOM] @[MENTION]`
