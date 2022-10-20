const on_theaters = require('../backup/carrusels_movies/on_theaters_movies.json');
const populars = require('../backup/carrusels_movies/populars_movies.json');
const topRated = require('../backup/carrusels_movies/topRated_movies.json');
const trending = require('../backup/carrusels_movies/trending_movies.json');
const upComing = require('../backup/carrusels_movies/upComing_movies.json');

const on_theatersData = () => {
	return on_theaters;
};

const popularsData = () => {
	return populars;
};

const topRatedData = () => {
	return topRated;
};

const trendingData = () => {
	return trending;
};

const upComingData = () => {
	return upComing;
};

module.exports = {
	on_theatersData,
	popularsData,
	topRatedData,
	trendingData,
	upComingData
}