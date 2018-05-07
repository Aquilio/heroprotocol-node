Wrapper for [https://github.com/Blizzard/heroprotocol](https://github.com/Blizzard/heroprotocol) to return valid JSON.

Releasehawk automatically grabs the latest version of `Blizzard/heroprotocol` and puts it in the `heroprotocol` folder along with the `heroprotocol.py` from https://github.com/esingleton/heroprotocol/commit/61622fba328e317480d9317a3910968ebd3a5cd5.

Sample execution:

```
const heroprotocol = require('heroprotocol');

heroprotocol.gameevents('path/to/replay'[, includeStats]) //includeStats === true || false
```
