const pkg = require('../package.json');
const program = require('commander');

const hp = require('../lib');

program
	.version(pkg.version)
	.option('-e, --event-file <path>', 'Event output file. Accepts game, attribute, message and tracker event files.', hp.parseFile.bind(hp))
	.parse(process.argv);

process.stdout.write(JSON.stringify(program.eventFile));
