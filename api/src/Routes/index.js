const { Router } = require('express');
const router = Router();
const { getSearchMulti } = require('../controlers API/searchbar-controller')
// const { Movies, Genres } = require('../db.js');

// Import functions from controllers:

// ROUTES:

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
