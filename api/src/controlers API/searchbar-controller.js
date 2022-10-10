import { axios } from axios;

//Funcion para hacer el request a la api de MULTISEARCH, si se le pasa un param (sea nombre de peli, serie o actor)
//lo manda por query y busca sobre la API lo relacionado, si no se le pasa nada, te trae el discover directamente.

const getSearchMulti = async (search) => {
  const type = search ? 'search' : 'discover';
  const change = search ? 'multi' : 'movie';

  const apiURL = await axios.get(`https://api.themoviedb.org/3/${type}/${change}`, {
    params: {
      api_key: '83d353826e0412f846edff6b5f421ad9',
      query: search
    }
  });

  const apiINFO = await apiURL.results.map(m => {
    return {
      id: m.id,
      title: title,
      overview: m.overview,
      popularity: m.popularity,
      image: m.poster_path,
      genres : m.genre_ids.map(g => g)
    }
  })

  return apiINFO;
}