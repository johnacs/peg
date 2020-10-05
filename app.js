const axios = require('axios');
const async = require('async');
const fs = require('fs');
const path = require('path');

function getInfo(obj, callback) {
	fs.writeFile(obj.filename, JSON.stringify(obj.content), callback);
}

async function getUsers(targetLocation) {
	if (!fs.existsSync(targetLocation)) {
		fs.mkdirSync(targetLocation);
	}
	try {
		const response = await axios.get('https://jsonplaceholder.typicode.com/users');
		const data = await response.data;
		const arr = await data.map((item) => {
			const container = {};
			container.filename = path.join(__dirname, `/${targetLocation}/${item.id}.json`);
			container.content = item;
			return container;
		});

		async.map(arr, getInfo);
	} catch (error) {
		console.error(error);
	}
}

getUsers('output');
