const { Router } = require('express');
const router = Router();
// const { Movies, Genres } = require('../db.js');

// Import functions from controllers:
const { getMoviesByIdApi } = require('../controllers API/index.js');

// ROUTES:
// GET VIDEOGAME BY ID:
router.get('/movies/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const movieDetail = await getMoviesByIdApi(id);
    res.send(movieDetail);
  } catch (error) {
    return res.status(404).send(error);
  }
});

module.exports = router;
