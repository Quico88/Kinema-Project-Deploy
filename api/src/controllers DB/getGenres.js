require('../Db/db.js');
const Genre = require('../Db/Schema/genre.js');

/* get all genres from database: */
const getAllGenresDB = async () => {
  const genres = await Genre.find();
  return genres;
};

module.exports = {
  getAllGenresDB,
};