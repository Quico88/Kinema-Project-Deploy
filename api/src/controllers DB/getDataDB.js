const Genre = require('../Db/Schema/genre.js');
const Serie = require('../Db/Schema/serie.js');

//EJEMPLO CONTROLLER:

const getSeriesByGenre = async (id) => {
	let genre = await Genre.findById(id)
	let listSeries = await Serie.find({'genre': genre._id})
	return listSeries
};

//EJEMPLO RUTA:

// router.get('/home/series/:id', async (req, res) => {
//   const { id } = req.params;
//   try {
//     let data = await getSeriesByGenre(id)
//     res.send(data);
//   } catch (error) {
//     res.status(400).json({Error: error.message});
//   }
// });