NodeJS wrapper for [https://github.com/Blizzard/heroprotocol](https://github.com/Blizzard/heroprotocol) to return valid JSON.

## What this is

This project is an interface to access the Blizzard provided parsing scripts, not a port. The supported `heroprotocol` arguments are exposed as methods, such as `heroprotocol.gameevents()`. See [#usage].

Releases for this project closely mirror Heroes of the Storm patches with
[ReleaseHawk](https://github.com/Aquilio/releasehawk). New patches to `Blizzard/heroprotocol` are automatically downloaded with a corresponding PR. A short time later, we publish a new version of `heroprotocol-node` to NPM.

## [Usage](#usage)

Sample execution:

```
const heroprotocol = require('heroprotocol');

//`includeStats` is a boolean flag for the --stats argument
//Each method returns a promise, resolving to the JSON report requested
heroprotocol.gameevents('path/to/replay'[, includeStats])
```

## Pre-requisites

- `python` must be accessible from the CLI.
- NodeJS >= v6 is required

## API

Each report method accepts two arguments:

- `path:String` Path of the replay file to be used.
- `includeStats:Boolean` defaults to `false`. Set to `true` to add the `--stats` argument.

_Note: There is currently an [open issue](https://github.com/Blizzard/heroprotocol/issues/64) with --stats not returning data._

Supported methods:

### gameevents(path[, includeStats])

print all game events including coordinates

### messageevents(path[, includeStats])

print message events such as ping events

### trackerevents(path[, includeStats])

print tracker events such as units killed, game stat events, score result event

### attributeevents(path[, includeStats])

print attribute events, a table of attrid, namespace, and attribute values

### header(path[, includeStats])

print protocol header including HotS build and elapsedGameLoops

### details(path[, includeStats])

print protocol details, e.g. teamId, player names and chosen heroes, player region, game result, observer status

### initdata(path[, includeStats])

print protocol initdata, e.g. interface settings for every player

### run(option:String, path:String[, includeStats:Boolean])

underlying function which executes the `heroprotocol.py` script with passed option
