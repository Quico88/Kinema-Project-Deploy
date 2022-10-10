require(`dotenv`).config();
const axios = require('axios');
const { YOUR_API_KEY_1 } = process.env;

const api_general_route = 'https://api.themoviedb.org/3';

// Get movie from API by ID:
const getMoviesByIdApi = async (id) => {
  const apiResponse = await axios.get(
    `${api_general_route}/movie/${id}?api_key=${YOUR_API_KEY_1}`
  );

  const image_route = 'https://image.tmdb.org/t/p/w400';

  var options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  // var today = new Date();

  const movie = {
    id: apiResponse.data.id,
    genres: apiResponse.data.genres.map((genre) => genre.name),
    title: apiResponse.data.title,
    description: apiResponse.data.overview,
    rating: apiResponse.data.vote_average,
    user_reviews: apiResponse.data.vote_count,
    release_date: new Date(apiResponse.data.release_date).toLocaleDateString(
      'en-US',
      options
    ),
    duration: `${apiResponse.data.runtime} minutes.`,
    poster: image_route + apiResponse.data.poster_path,
    back_poster: image_route + apiResponse.data.backdrop_path,
  };
  return movie;
};

// Get trailer from API by ID:
const getTrailerMovie = async (id) => {
  const apiResponse = await axios.get(
    `${api_general_route}/movie/${id}/videos?api_key=${YOUR_API_KEY_1}`
  );

  const trailer = `https://www.youtube.com/watch?v=${apiResponse.data.results[0].key}`;

  return trailer;
};

module.exports = {
  getMoviesByIdApi,
  getTrailerMovie,
};
