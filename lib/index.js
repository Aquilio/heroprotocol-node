const fs = require('fs');
const spawn = require('child_process').spawn;
const path = require('path');

const hp = {
	run(option, filePath, stats) {
		//TODO: Need a better way for that path
		const args = [path.resolve('./node_modules/heroprotocol#f3bde9/heroprotocol.py'), `--${option}`, path.resolve(filePath), '--json'];

		if(stats) {
			args.splice(2, 0, '--stats');
		}

		const heroprotocol = spawn('python', args);

		let stdout = '';
		let stderr = '';

		heroprotocol.stdout.on('data', data => stdout += data);
		heroprotocol.stderr.on('data', data => stderr += data);

		heroprotocol.on('close', code => {
			//TODO: logging & error handling
			if(!code) {
				process.stdout.write(stdout);
			}
		});
	}
};

module.exports = hp;
