const fs = require('fs');

const hp = {
	parse(str) {
		str = str.replace(/}\r?\n|\r/g, '},')
			.replace(/,$/, '');

		return JSON.parse(`[${str}]`);
	},

	parseFile(path) {
		const data = fs.readFileSync(path);
		return this.parse(data.toString());
	}
};

module.exports = hp;
