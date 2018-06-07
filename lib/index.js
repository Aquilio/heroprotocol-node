const assign = require('lodash.assign');
const spawn = require('child_process').spawn;
const path = require('path');
const fs = require('fs');

const heroprotocol = {};

const methods = ['gameevents', 'messageevents', 'trackerevents',
	'attributeevents', 'header', 'details', 'initdata'];

methods.forEach(method => {
	heroprotocol[method] = function(...args) {
		return this.run.apply(this, [method, ...args]);
	};
});

assign(heroprotocol, {
	run(option, filePath, includeStats) {
		return new Promise((resolve, reject) => {
			fs.accessSync(filePath, fs.constants.R_OK);

			const args = [path.resolve(__dirname, '../heroprotocol/heroprotocol.py'), `--${option}`, filePath, '--json'];

			if(includeStats) {
				args.splice(2, 0, '--stats');
			}

			const process = spawn('python', args);

			let stdout = '';
			let stderr = '';

			process.stdout.on('data', data => stdout += data);
			process.stderr.on('data', data => stderr += data);

			process.on('close', code => {
				if(!code) {
					resolve(JSON.parse(stdout));
				}
				else {
					reject(stderr);
				}
			});
		});
	}
});

module.exports = heroprotocol;
