const axios = require('axios');
const data = require('../backup/movies.json')

const getDataJSON = async (page) => {
	let omit = (page - 1) * 20;
	let limit = omit + 20;

	return data.slice(omit, limit);
};

getDataSearchJSON = async (page, name) => {
	let omit = (page - 1) * 20;
	let limit = omit + 20;
	
	let regExp = new RegExp(name, 'i');
	let dataFiltered = data.filter( n => regExp.test(n.title));
	return dataFiltered.slice(omit, limit);
};

module.exports = {
	getDataJSON,
	getDataSearchJSON
}