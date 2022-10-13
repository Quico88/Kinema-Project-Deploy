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
const User = require('../Db/Schema/user');


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

router.post('/register', async (req, res) => {
  const { email, password } = req.body;

  const user = new User({ email, password })

  user.save(err => {
    if (err) {
      res.status(500).send('Register Error')
    } else {
      res.status(200).send('Register Completed')
    }
  })
})


router.post('/login', async (req, res) => {

  const { email, password, google } = req.body;
  //chequeo tener pass y mail
  try {
    if (email && password) {
      //si tengo pass y mail chequeo si entra con google o no.
      if (google) {
        const userGoogle = await User.findOne({
          email,
          password,
          google: true
        });
        //si el usuario de google esta registrado mando los datos OK al front
        if (userGoogle) {
          req.session.userId = userGoogle.email;
          res.send(userGoogle)
        }
        // si el usuario de google no esta, lo registro
        else {
          const userGoogleRegister = new User({ email, password, google: true })
          userGoogleRegister.save()
          if (userGoogleRegister) {
            const sendUserGoogle = {
              email: userGoogleRegister.email
            }
            req.session.userId = userGoogleRegister.email;
            res.send(sendUserGoogle)
          } else {
            res.send('Create Google user Error')
          }
        }
      }       //si no es usuario de google me fijo si lo tengo en la bd
      else {
        const userNotGoogle = await User.findOne({
          email
        },(err, user) => {
          user.isCorrectPassword(password, (err, result) => {
            if(result){
              console.log('ok')
            } else{
              console.log('no ok')
            }
          })
        } );
        if (userNotGoogle) { // si lo tengo mando el ok al front
          req.session.userId = userNotGoogle.email;
          res.send(userNotGoogle)
        } else {
          res.send('Invalid email or password')
        }
      }
    } else { //si no lo tengo le mando al front q puede haber algo mal, si no tendra q registrarse en el form
      res.send('Missing email or password')
    }
  } catch (error) {
    res.send(error)
  }
})

module.exports = router;
