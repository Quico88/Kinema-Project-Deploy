require(`dotenv`).config();
const axios = require('axios');
const { YOUR_API_KEY_1 } = process.env;
const Serie = require('../Db/Schema/serie.js');

const api_general_route = 'https://api.themoviedb.org/3';

// Get TVSeries from API by ID with first season:
const getTVSeriesByIdApi = async (id) => {
  let dataSerie = await Serie.findOne({'id': id});

  if(!dataSerie) return 'Serie not found';

  const image_route = 'https://image.tmdb.org/t/p/original';

  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  const apiResponse = await axios.get(
    `${api_general_route}/tv/${id}?api_key=${YOUR_API_KEY_1}`
  );

  const TVSerie = {
    id: apiResponse.data.id,
    genres: apiResponse.data.genres.map((genre) => genre.name),
    title: apiResponse.data.name,
    description: apiResponse.data.overview,
    rating: apiResponse.data.vote_average,
    user_reviews: apiResponse.data.vote_count,
    release_date_first_episode: new Date(
      apiResponse.data.first_air_date
    ).toLocaleDateString('en-US', options),
    number_seasons: apiResponse.data.number_of_seasons,
    poster: image_route + apiResponse.data.poster_path,
    back_poster: image_route + apiResponse.data.backdrop_path,
  };

  const seasonOne = await axios.get(
    `${api_general_route}/tv/${id}/season/1?api_key=${YOUR_API_KEY_1}`
  );

  TVSerie.season_one = {
    id: seasonOne.data._id,
    air_date_first_episode: new Date(seasonOne.data.air_date).getFullYear(),
    name:
      seasonOne.data.name.charAt(0).toUpperCase() +
      seasonOne.data.name.slice(1),
    poster: image_route + seasonOne.data.poster_path,
    number_episodes: seasonOne.data.episodes.length,
    season_number: seasonOne.data.season_number,
    episodes: seasonOne.data.episodes.map((episode) => {
      return {
        id: episode.id,
        name: episode.name,
        overview: episode.overview,
        episode_number: episode.episode_number,
        air_date: new Date(episode.air_date).toLocaleDateString(
          'en-US',
          options
        ),
        image: image_route + episode.still_path,
        duration: episode.runtime,
      };
    }),
  };
  return TVSerie;
};

// Get trailer of TVSerie from API by ID:
const getTrailerSerie = async (id) => {
  const apiResponse = await axios.get(
    `${api_general_route}/tv/${id}/videos?api_key=${YOUR_API_KEY_1}`
  );

  const trailer = apiResponse.data.results[0]
    ? `https://www.youtube.com/watch?v=${apiResponse.data.results[0].key}`
    : null;

  return trailer;
};

module.exports = {
  getTVSeriesByIdApi,
  getTrailerSerie,
};