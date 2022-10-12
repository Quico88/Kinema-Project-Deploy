require(`dotenv`).config();
const axios = require('axios');
const { YOUR_API_KEY_1 } = process.env;

const api_general_route = 'https://api.themoviedb.org/3';

// const image_route = 'https://image.tmdb.org/t/p/w400';
const image_route = 'https://image.tmdb.org/t/p/original';

const options = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
};

// Get movie/serie carrusels from API for home all:
const getAllCarrusels = async () => {
  const allCarrusels = {};

  const trending = await axios.get(
    `${api_general_route}/trending/movie/day?api_key=${YOUR_API_KEY_1}`
  );

  const on_theaters = await axios.get(
    `${api_general_route}/movie/now_playing?api_key=${YOUR_API_KEY_1}`
  );

  const populars = await axios.get(
    `${api_general_route}/movie/popular?api_key=${YOUR_API_KEY_1}`
  );

  const topRated = await axios.get(
    `${api_general_route}/movie/top_rated?api_key=${YOUR_API_KEY_1}`
  );

  const upComing = await axios.get(
    `${api_general_route}/movie/upcoming?api_key=${YOUR_API_KEY_1}`
  );

  allCarrusels.trending = trending.data.results;
  allCarrusels.on_theaters = on_theaters.data.results;
  allCarrusels.populars = populars.data.results;
  allCarrusels.topRated = topRated.data.results;
  allCarrusels.upComing = upComing.data.results;

  for (const carrusel in allCarrusels) {
    allCarrusels[carrusel] = allCarrusels[carrusel].map((movie) => {
      return {
        id: movie.id,
        title: movie.title,
        poster: image_route + movie.poster_path,
        back_poster: image_route + movie.backdrop_path,
        rating: movie.vote_average,
        release_date: new Date(movie.release_date).toLocaleDateString(
          'en-US',
          options
        ),
        genres: movie.genre_ids?.map((genre_id) => {
          if (genre_id === 27) return 'Horror';
          if (genre_id === 28) return 'Action';
          if (genre_id === 12) return 'Adventure';
          if (genre_id === 16) return 'Animation';
          if (genre_id === 35) return 'Comedy';
          if (genre_id === 80) return 'Crime';
          if (genre_id === 99) return 'Documentary';
          if (genre_id === 18) return 'Drama';
          if (genre_id === 10751) return 'Family';
          if (genre_id === 14) return 'Fantasy';
          if (genre_id === 36) return 'History';
          if (genre_id === 10402) return 'Music';
          if (genre_id === 9648) return 'Mystery';
          if (genre_id === 10749) return 'Romance';
          if (genre_id === 878) return 'Science Fiction';
          if (genre_id === 10770) return 'Tv Movie';
          if (genre_id === 53) return 'Thriller';
          if (genre_id === 10752) return 'War';
          if (genre_id === 37) return 'Western';
        }),
      };
    });
  }
  return allCarrusels;
};

module.exports = {
  getAllCarrusels,
};
