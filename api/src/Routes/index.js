const { Router } = require('express');
const router = Router();
const { getSearchSeriesDB, getSearchMovies } = require('../controllers API/searchbar-controller');
const Stripe = require("stripe")
const stripe = new Stripe(process.env.STRIPE_KEY)

// const { Movies, Genres } = require('../db.js');

// Import functions from controllers:

const {getMoviesGenreById} = require("../controllers API/genresMovies")

const {
  getMoviesByIdApi,
  getTrailerMovie,
} = require('../controllers API/detailedMovie.js');

const {getGenresFromAPI}
 = require("../controllers API/genresMovies.js")

const { getAllGenresDB } = require('../controllers DB/getGenres.js');

const { getMovies } = require('../controllers API/only-movies');

const {
  getSeasonDetails,
} = require('../controllers API/detailedSeasonSelected.js');

const {
  getTVSeriesByIdApi,
  getTrailerSerie,
} = require('../controllers API/detailedTVSerie.js');

const {
  getSeriesByGenre,
  getAllSeriesDB
} = require('../controllers DB/getDataDB.js');

const { getAllCarrusels } = require('../controllers API/homeAll.js');

const { getAllCarruselsTV } = require('../controllers DB/homeAllDB.js');

// ROUTES:

// Get season and it's episodes details by ID and season number:
router.get('/season/:id/:season', async (req, res) => {
  try {
    const { id, season } = req.params;
    const season_detail = await getSeasonDetails(id, season);
    if(typeof season_detail === 'string') return res.json(season_detail); //si NO existe la serie te envia un string
    res.send(season_detail); //si existe la serie te envia un objeto con todos los datos
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
    if(typeof TVSeriesDetail === 'string') return res.json(TVSeriesDetail)
    const trailer = await getTrailerSerie(id);

    TVSeriesDetail = {
      ...TVSeriesDetail,
      trailer,
    };
    res.send(TVSeriesDetail);
  } catch (error) {
    return res.status(404).send({Error: error.message});
  }
});

// Get only movies:
router.get('/home/movies', async (req, res) => {
  const { page } = req.query
  try {
    let movies = await getMovies(page);
    res.send(movies);
  } catch (error) {
    res.status(400).json(error);
  }
});

// Get movie/series from API by name search:
router.get('/home/search', async (req, res) => {
  try {
    const { page , name} = req.query;
    let allSeries = await getSearchSeriesDB(name, page);
    let allMovies = await getSearchMovies(name, page)
    let seriesAndMovies = allSeries.concat(allMovies)
    
    seriesAndMovies.sort((a, b) => {
      if (a.vote_average < b.vote_average) {
          return 1;
      }
      if (a.vote_average > b.vote_average) {
          return -1;
      }
      return 0;
  })
    res.send(seriesAndMovies);
  } catch (error) {
    res.status(400).json(error);
  }
});

// Stripe:
router.post("/payment/premium", async (req,res)=>{
 try { 
  const {id, amount} = req.body
  const payment = await stripe.paymentIntents.create({
    amount,
    currency : "USD",
    description : "Plan Premium",
    payment_method : id,
    confirm : true
  })
    res.send({message : "Congratulations for your Premium Plan"})
 } catch (error) { 
  res.json({message: error.row.message})
 }
  })
 
router.post("/payment/rent", async (req,res)=>{
  try { 
   const {id, amount} = req.body
   const payment = await stripe.paymentIntents.create({
     amount,
     currency : "USD",
     description : "Movie rent",
     payment_method : id,
     confirm : true
   })
     res.send({message : "Enjoy your movie"})
  } catch (error) {  
   res.json({message: error.row.message})
  }
   })

// Get movies/series carrusels from API:
router.get('/home', async (req, res) => {
  try {
    const allCarruselsMovies = await getAllCarrusels();
    const allCarruselsSeries = await getAllCarruselsTV();
    res.send({
      allCarruselsMovies,
      allCarruselsSeries,
    });
  } catch (error) {
    res.status(400).json(error);
  }
});

// Get serie by genres:
router.get('/home/series/:id', async (req, res) => {
  const { id } = req.params;
  try {
    let data = await getSeriesByGenre(id);
    res.send(data);
  } catch (error) {
    res.status(400).json({Error: error.message});
  }
});

// Get all serie from database:
router.get('/home/series', async (req, res) => {
  const { page } = req.query;
  try {
    let skip = (page - 1) * 20;
    let limit = 20;
    let data = await getAllSeriesDB(skip, limit);
    res.json(data);
  } catch (error) {
    res.status(400).json({Error: error.message});
  }
})


// Get genres from DB:
router.get('/home/genres/movies', async (req, res) => {
  try {
    const genres = await getGenresFromAPI()
    res.send(genres);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.get('/home/genres/movies/id', async (req, res) => {
  const {id,page} = req.query
  try {
    const genres = await getMoviesGenreById(id,page)
    res.send(genres);
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;
