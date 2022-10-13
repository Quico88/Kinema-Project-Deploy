// require('../Db/db.js');

// const TVSeries = require('../models/serie.js');

// const getAllCarruselsTV = async () => {
//   const allCarruselsTV = {};

//   const topRatedSeries = await TVSeries.find({})
//     .sort({ vote_average: -1 })
//     .limit(20);

//   const latestSeries = await TVSeries.find({})
//     .sort({ first_air_date: -1 })
//     .limit(20);

//   allCarruselsTV.topRatedSeries = topRatedSeries;
//   allCarruselsTV.latestSeries = latestSeries;

//   return allCarruselsTV;
// };

// module.exports = {
//   getAllCarruselsTV,
// };
