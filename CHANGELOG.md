# Changelog
## Build 7.0.2
**July 30, 2018**
* Updates Pokémon Go codes to CloudWatch upon startup
* Adds new welcome messages for the Comet Observatory
* Updates dblapi.js to v2.2.0
* Adds some webhook logs for dblapi.js

## Build 7.0.1
**July 8, 2018**
* Pokémon Go codes are now able to be copied on Discord mobile
  * Subsequently, embeds are not used for Pokémon Go codes anymore

## Build 7.0.0
**July 6, 2018**
* Adds r!support command and help documentation
* Adds r!bug and r!suggest commands for support server
* Updates the guild join message
* Removes emoji icons for r!status command

## Build 6.2.3
**June 29, 2018**
* Tells users who do not have access to r!status that it is a developer command only
* Nickname will localize based on server region

## Build 6.2.2
**June 28, 2018**
* Adds r!changelog command
* Fixes issue with counting Pokémon Go codes in r!status

## Build 6.2.1
**June 27, 2018**
* Adds users serving and Pokémon Go codes stored to r!status
* Updates the help documentation for r!poGoCode
* Removes thumbnails from embeds that just use the bot's profile picture
* Bug fixes
  * Attempt to fix DBL guild post issue

## Build 6.2
**June 21, 2018**
* Adds Pokémon Go friend code support
  * Pokémon Go code privacy settings
  * Adds command and description to commands.json
  * Uploads Pokémon Go code count to CloudWatch
* Moves DBL server count to Live Bot initialization to prevent testing bots from uploading guild count
* Bug fixes
  * Fixes some CRUD operations that created invalid entries
