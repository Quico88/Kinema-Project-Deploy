require(`dotenv`).config();
const axios = require('axios');
const { YOUR_API_KEY_1 } = process.env;

const  getGenresFromAPI = async ()=>{
    const {data} = await axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${YOUR_API_KEY_1}&language=en-US`);
    return data.genres
}


const getMoviesGenreById = async (id,page) => {
  const {
    data: { results },
  } = await axios.get(
    `https://api.themoviedb.org/3/discover/movie?api_key=${YOUR_API_KEY_1}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${id}&with_watch_monetization_types=flatrate`
  );
  const movieData = results.map((m) => {
    return {
      id: m.id,
      title: m.title,
      description: m.overview,
      vote_average: m.vote_average,
      poster: m.poster_path,
      backPoster: m.backdrop_path,
      genres: m.genre_ids?.map((m) => {
        if (m === 27) return 'Horror';
        if (m === 28) return 'Action';
        if (m === 12) return 'Adventure';
        if (m === 16) return 'Animation';
        if (m === 35) return 'Comedy';
        if (m === 80) return 'Crime';
        if (m === 99) return 'Documentary';
        if (m === 18) return 'Drama';
        if (m === 10751) return 'Family';
        if (m === 14) return 'Fantasy';
        if (m === 36) return 'History';
        if (m === 10402) return 'Music';
        if (m === 9648) return 'Mystery';
        if (m === 10749) return 'Romance';
        if (m === 878) return 'Science Fiction';
        if (m === 10770) return 'Tv Movie';
        if (m === 53) return 'Thriller';
        if (m === 10752) return 'War';
        if (m === 37) return 'Western';
      }),
    };
  });

  const validate = (m) => {
    const moviesVal = [];
    m.map((n) => {
      if (
        !n.title ||
        n.title.length < 1 ||
        !n.description ||
        n.description.length < 1 ||
        !n.backPoster ||
        n.backPoster.length < 1 ||
        !n.id ||
        !n.poster ||
        n.poster.length < 1 ||
        !fetchMovie(n.id)
      ) {
        return null;
      } else {
        moviesVal.push(n);
      }
    });
    return moviesVal;
  };

  const fetchMovie = async (id) => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}`,
      {
        params: {
          api_key: YOUR_API_KEY_1,
          append_to_response: 'videos',
        },
      }
    );
    if (data.key) return true;
  };
  return validate(movieData);
};


module.exports = {
    getGenresFromAPI,
    getMoviesGenreById,
} 