# Changelog
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
