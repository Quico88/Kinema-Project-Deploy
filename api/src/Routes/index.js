const { Router } = require('express');
const router = Router();
const { getSearchMulti } = require('../controllers API/searchbar-controller')
// const { Movies, Genres } = require('../db.js');

// Import functions from controllers:
const {
  getMoviesByIdApi,
  getTrailerMovie,
} = require('../controllers API/detailedMovie.js');

// ROUTES:
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

router.get('/home/search', async (req, res) => {

    try {
        const { name } = req.query;
        let allMovies = await getSearchMulti(name)
        res.send(allMovies)
        console.log(allMovies)
    } catch (error){
        res.status(400).json(error)
    }

})


module.exports = router;
