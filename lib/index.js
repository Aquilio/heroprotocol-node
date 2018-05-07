const _ = require('lodash');
const fs = require('fs');
const spawn = require('child_process').spawn;
const path = require('path');

const heroprotocol = {};

const methods = ['gameevents', 'messageevents', 'trackerevents',
	'attributeevents', 'header', 'details', 'initData'];

methods.forEach(method => {
	heroprotocol[method] = function(...args) {
		return this.run.apply(this, [method, ...args]);
	};
});

_.assign(heroprotocol, {
	run(option, filePath, includeStats) {
		return new Promise((resolve, reject) => {
			const args = [path.resolve('./heroprotocol/heroprotocol.py'), `--${option}`, path.resolve(filePath), '--json'];

			if(includeStats) {
				args.splice(2, 0, '--stats');
			}

			const process = spawn('python', args);

			let stdout = '';
			let stderr = '';

			process.stdout.on('data', data => stdout += data);
			process.stderr.on('data', data => stderr += data);

			process.on('close', code => {
				//TODO: logging & error handling
				if(!code) {
					resolve(stdout);
				}
				else {
					reject(stderr);
				}
			});
		});
	}
});

module.exports = heroprotocol;
