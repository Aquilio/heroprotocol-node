const path = require('path');
const assert = require('assert');
const isPlainObject = require('lodash.isplainobject');
const mock = require('mock-require');
const Spawn = require('mock-spawn');

let heroprotocol = require('../lib');

const sample = path.resolve('./data/sample.StormReplay');
const py = path.resolve('./heroprotocol/heroprotocol.py');

describe('basic tests', () => {
	const methods = ['gameevents', 'messageevents', 'trackerevents',
		'attributeevents', 'header', 'details', 'initdata'];

	methods.forEach(method => {
		it(`should create a ${method} report`, async () => {
			const report = await heroprotocol[method](sample);

			//We don't test the format of the report as Blizzard
			//may change the report in the future. Rather, we only
			//test that a valid JSON object is returned.
			assert.ok(isPlainObject(report));
		});

		it(`should create a ${method} report with stats`, async () => {
			const report = await heroprotocol[method](sample, true);

			assert.ok(isPlainObject(report));
		});

		it(`should spawn the python process with --${method}`, async () => {
			const spawn = Spawn();
			spawn.setDefault(spawn.simple(0, '{}'));
			mock('child_process', { spawn });
			heroprotocol = mock.reRequire('../lib');

			const report = await heroprotocol[method](sample);

			assert.deepEqual(spawn.calls.length, 1);

			const { command, args } = spawn.calls[0];
			assert.deepEqual(command, 'python');
			assert.deepEqual(args.join(' '), `${py} --${method} ${sample} --json`);
			mock.stop('child_process');
		});

		it(`should spawn the python process with --${method} and --stats`, async () => {
			const spawn = Spawn();
			spawn.setDefault(spawn.simple(0, '{}'));
			mock('child_process', { spawn });
			heroprotocol = mock.reRequire('../lib');

			const report = await heroprotocol[method](sample, true);

			assert.deepEqual(spawn.calls.length, 1);

			const { command, args } = spawn.calls[0];
			assert.deepEqual(command, 'python');
			assert.deepEqual(args.join(' '), `${py} --${method} --stats ${sample} --json`);
			mock.stop('child_process');
		});
	});
});
