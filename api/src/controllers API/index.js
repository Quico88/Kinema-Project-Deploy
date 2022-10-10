// https://api.themoviedb.org/3/movie/123?api_key=ca212c61e3ad0761ddbc73bf46306844

require(`dotenv`).config();
const axios = require('axios');
const { YOUR_API_KEY_1 } = process.env;

// Get videogames from API by ID:
const getMoviesByIdApi = async (id) => {
  const apiResponse = await axios.get(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${YOUR_API_KEY_1}`
  );

  const image_route = 'https://image.tmdb.org/t/p/w400';

  const movie = {
    genre: apiResponse.data.genres.map((genre) => genre.name),
    name: apiResponse.data.title,
    description: apiResponse.data.overview,
    rating: apiResponse.data.vote_average,
    user_reviews: apiResponse.data.vote_count,
    release_date: apiResponse.data.release_date,
    duration: `${apiResponse.data.runtime} minutes.`,
    video: apiResponse.data.video,
    poster: image_route + apiResponse.data.poster_path,
  };
  return movie;
};

module.exports = {
  getMoviesByIdApi,
};
