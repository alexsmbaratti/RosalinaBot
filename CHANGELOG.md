# Changelog
## Build 7.4.0
**January 20, 2019**
* Revamps r!help and its menus
* Using r!ssbu friend will indicate that the lobby is only open to friends
* Using r!ssbu with a valid ID/password will delete the preceding message to keep chat tidy
* Adds inline formatting for r!smm command
* Updated art

## Build 7.3.1
**January 18, 2019**
* Adds r!ssbu command
  * Share your Super Smash Bros. Ultimate Battle Arenas
* Adds r!serverinfo command

## Build 7.3.0
**January 14, 2019**
* Adds r!ssbu command
  * Share your Super Smash Bros. Ultimate Battle Arenas

## Build 7.2.0
**December 27, 2018**
* Adds shortcut commands
  * Example: r!switchCode can be written as r!sc
* Guild count now posted to discord.bots.gg
* Fixes typo for r!help settings

## Build 7.1.3
**December 15, 2018**
* Adds r!role command for Comet Observatory members

## Build 7.1.2
**November 20, 2018**
* PRIVACY UPDATE: By popular demand, all new codes stored are set to public by default.
  * Note: Any existing codes will retain their current privacy settings and will not be affected by this change.
* r!echo command and r!echod command

## Build 7.1.1
**November 17, 2018**
* Adds the ability to check the latest announced Nintendo Direct using `r!direct`
  * Note: The ability to have Nintendo Directs announced in specific channels automatically is coming soon
* Updates the calendar used for checking for Nintendo Directs

## Build 7.1.0
**October 30, 2018**
* Nintendo Directs are now announced in the Comet Observatory
* Sends Comet Observatory member count to CloudWatch
* Adds iCal as a dependency

## Build 7.0.3
**October 17, 2018**
* Filters out users with Discord invites when welcoming new users to the Comet Observatory
* Adds Comet Observatory members to r!status
* Reformats r!status command

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
