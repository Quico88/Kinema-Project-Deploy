const axios = require('axios');
const data = require('../backup/movies.json');
const genres_json = require('../backup/genres_movies.json');

// Para obtener los datos del home
const getDataJSON = (page) => {
	let omit = (page - 1) * 20;
	let limit = omit + 20;
	//let totalResults = data.length;
	return data.slice(omit, limit);
	//return {data: data.slice(omit, limit), totalResults};
};

// Para obtener los datos del search
const getDataSearchJSON = (page, name) => {
	let omit = (page - 1) * 20;
	let limit = omit + 20;
	let regExp = new RegExp(name, 'i');
	let dataFiltered = data.filter( n => regExp.test(n.title));
	return dataFiltered.slice(omit, limit);
};

// Para obtener el detalle de una movie
const getDetailJSON = (id) => {
	let detail = data.find( movie => movie.id == id);
	return detail;
};

// Para obtener el nombre de los generos y su id
const getGenresJSON = () => {
	return genres_json;
}

// Para obtener el nombre del genero por su id
const getGenreIdJSON = (id) => {
	if (id == 27) return 'Horror';
  if (id == 28) return 'Action';
  if (id == 12) return 'Adventure';
  if (id == 16) return 'Animation';
  if (id == 35) return 'Comedy';
  if (id == 80) return 'Crime';
  if (id == 99) return 'Documentary';
  if (id == 18) return 'Drama';
  if (id == 10751) return 'Family';
  if (id == 14) return 'Fantasy';
  if (id == 36) return 'History';
  if (id == 10402) return 'Music';
  if (id == 9648) return 'Mystery';
  if (id == 10749) return 'Romance';
  if (id == 878) return 'Science Fiction';
  if (id == 10770) return 'Tv Movie';
  if (id == 53) return 'Thriller';
  if (id == 10752) return 'War';
  if (id == 37) return 'Western';
}

// Para obtener las movies segun su genero
const getMoviesByGenreJSON = (id, page) => {
	let omit = (page - 1) * 20;
	let limit = omit + 20;
	let genre = getGenreIdJSON(id);
	let dataFiltered = data.filter( movie => movie.genres.includes(genre));
	return dataFiltered.slice(omit, limit);
};

const getVideoJSON = (id) => {
	let filtered = data.find(movie => movie.id == id)
	return filtered.trailer
}
module.exports = {
	getDataJSON,
	getDataSearchJSON,
	getDetailJSON,
	getMoviesByGenreJSON,
	getGenreIdJSON,
	getGenresJSON,
	getVideoJSON
}