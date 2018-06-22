# Changelog
## Build 6.2
**June 21, 2018**
* Adds Pokémon Go friend code support
  * Pokémon Go code privacy settings
  * Adds command and description to commands.json
  * Uploads Pokémon Go code count to CloudWatch
* Moves DBL server count to Live Bot initialization to prevent testing bots from uploading guild count
* Bug fixes
  * Fixes some CRUD operations that created invalid entries
