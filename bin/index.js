const pkg = require('../package.json');
const program = require('commander');
const _ = require('lodash');

const hp = require('../lib');

const commands = {
	gameevents: 'Print all game events including coordinates',
	messageevents: 'Print message events such as ping events.',
	trackerevents: 'Print tracker events such as units killed, game stat events, and the score result event.',
	attributeevents: 'Print attribute events, a table of attrid, namespace, and attribute values.',
	header: 'Print protocol header including HotS build and elapsedGameLoops.',
	details: 'Print protocol details, e.g. teamId, player names and chosen heroes, player region, game result, and observer status.',
	initdata: 'Print protocol initdata, e.g. interface settings for every player.'
};

program
	.version(pkg.version)
	.usage('<option> <path>');

_.forEach(commands, (description, command) => {
	program
		.command(`${command} <path>`)
		.description(description)
		//TODO: With the JSON modified python script, we lose the --stats option. --stats also writes to stderr instead of stdout.
		// .option('--stats', 'Print game stats.')
		.action((path, cmd) => hp.run(command, path, !!cmd.stats));
});

program.parse(process.argv);
