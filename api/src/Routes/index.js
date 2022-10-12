const { Router } = require('express');
const router = Router();
const { getSearchMulti } = require('../controllers API/searchbar-controller');
// const { Movies, Genres } = require('../db.js');

// Import functions from controllers:
const {
  getMoviesByIdApi,
  getTrailerMovie,
} = require('../controllers API/detailedMovie.js');
const { getMovies } = require('../controllers API/only-movies');

const {
  getSeasonDetails,
} = require('../controllers API/detailedSeasonSelected.js');
const {
  getTVSeriesByIdApi,
  getTrailerSerie,
} = require('../controllers API/detailedTVSerie.js');
const { getAllCarrusels } = require('../controllers API/homeAll.js');
const { getAllCarruselsTV } = require('../controllers DB/homeAllDB.js');
// ROUTES:

// Get season and it's episodes details by ID and season number:
router.get('/season/:id/:season', async (req, res) => {
  try {
    const { id, season } = req.params;
    const season_detail = await getSeasonDetails(id, season);
    res.send(season_detail);
  } catch (error) {
    return res.status(404).send(error);
  }
});

// Get movie from API by ID with trailer:
router.get('/movies/:id', async (req, res) => {
  try {
    const { id } = req.params;
    let movieDetail = await getMoviesByIdApi(id);
    const trailer = await getTrailerMovie(id);

    movieDetail = {
      ...movieDetail,
      trailer,
    };
    res.send(movieDetail);
  } catch (error) {
    return res.status(404).send(error);
  }
});

// Get serie from API by ID with trailer:
router.get('/tv/:id', async (req, res) => {
  try {
    const { id } = req.params;
    let TVSeriesDetail = await getTVSeriesByIdApi(id);

    const trailer = await getTrailerSerie(id);

    TVSeriesDetail = {
      ...TVSeriesDetail,
      trailer,
    };

    res.send(TVSeriesDetail);
  } catch (error) {
    return res.status(404).send(error);
  }
});

// Get movie/series from API by name search:

router.get('/home/movies', async (req, res) => {
  try {
    let movies = await getMovies();
    res.send(movies);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.get('/home/search', async (req, res) => {
  try {
    const { name } = req.query;
    let allMovies = await getSearchMulti(name);
    res.send(allMovies);
    console.log(allMovies);
  } catch (error) {
    res.status(400).json(error);
  }
});

// Get movies/series carrusels from API:
router.get('/home', async (req, res) => {
  try {
    const allCarruselsMovies = await getAllCarrusels();
    // const allCarruselsSeries = await getAllCarruselsTV();
    res.send({
      allCarruselsMovies,
      // allCarruselsSeries,
    });
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;
