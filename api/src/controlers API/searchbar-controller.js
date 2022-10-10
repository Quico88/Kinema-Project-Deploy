const axios = require('axios');
const e = require('express');
require('dotenv').config();
const { YOUR_API_KEY_1 } = process.env
//Funcion para hacer el request a la api de MULTISEARCH, si se le pasa un param (sea nombre de peli, serie o actor)
//lo manda por query y busca sobre la API lo relacionado, si no se le pasa nada, te trae el discover directamente.

const getSearchMulti = async (search) => {
  const type = search ? 'search' : 'discover';
  const change = search ? 'multi' : 'movie';

  const {data: {results}} = await axios.get(`https://api.themoviedb.org/3/${type}/${change}`, {
    params: {
      api_key: YOUR_API_KEY_1,
      query: search
    }
  });

  const movieSearch = results.map(m => {
    return {
      id: m.id,
      title: m.title,
      type: m.media_type,
      description: m.overview,
      poster: m.poster_path,
      backPoster: m.backdrop_path,
    }
  })
  return movieSearch
}

module.exports = {
  getSearchMulti
}