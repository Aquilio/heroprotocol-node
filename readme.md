__Note:__ Due to the recent [announcement](https://news.blizzard.com/en-us/blizzard/22833558/heroes-of-the-storm-news) regarding the HGC 2019 season, this repository is being archived for the time being. Originally,
this project was intended to be one piece of many leading in an application to analyze Heroes of the Storm gameplay. We'll leave the concept
page up and now open to the public for the time being [gambit.aquil.io](https://gambit.aquil.io).

In the near future, we may release the work we've done so far on that concept as a set of public projects, but we'll need to do some re-organizing
beforehand. Special thanks to Gillyweed and Dreadnaught for initial feedback on the concept and to all the community devs we've discussed this
with!

_Mrgglglbrlg rmrmgllg mrggggm. Mrrglglgy, mgllglgl mgggrrmgl? MRGGGLGLLM! Mrrggllgggllggll mrrglrlg mrrg mrrg mrrrg._

[![Build Status](https://travis-ci.org/Aquilio/heroprotocol-node.svg?branch=master)](https://travis-ci.org/Aquilio/heroprotocol-node)
[![Greenkeeper badge](https://badges.greenkeeper.io/Aquilio/heroprotocol-node.svg)](https://greenkeeper.io/)

This project is an interface to access the Blizzard provided parsing scripts. The supported `heroprotocol` arguments are exposed as methods, such as `heroprotocol.gameevents()`. See [usage](#usage).

Releases for this project closely mirror Heroes of the Storm patches with
[ReleaseHawk](https://github.com/Aquilio/releasehawk). New patches to `Blizzard/heroprotocol` are automatically downloaded with a corresponding PR. A short time later, we publish a new version of `heroprotocol-node` to NPM.

## Usage

Sample execution:

```
const heroprotocol = require('heroprotocol');

//`includeStats` is a boolean flag for the --stats argument
//Each method returns a promise, resolving to the JSON report requested
const report = await heroprotocol.gameevents('path/to/replay'[, includeStats])
```

## Pre-requisites

- `python` must be accessible from the CLI.
- NodeJS >= 8 is required

## Installation

`npm i --save heroprotocol-node`

or

`yarn add heroprotocol-node`

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
