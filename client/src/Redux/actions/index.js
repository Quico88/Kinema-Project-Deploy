import axios from "axios";
import { GET_MOVIE_DETAIL, CLEAR_MOVIE_DETAIL, GET_SERIE_DETAIL, CLEAR_SERIE_DETAIL, GET_SEASON_DETAIL } from "./const";


// MovieDetail Actions :
export function getMovieDetail(id) {
  return async function (dispatch) {
    try {
      var json = await axios.get("http://localhost:3001/movies/" + id);
      return dispatch({
        type: GET_MOVIE_DETAIL,
        payload: json.data
      })
    } catch (error) {
      console.log(error);
    }
  }
}

export const clearMovieDetail = () => ({ type: CLEAR_MOVIE_DETAIL })

// TVShowDetail Actions:
export function getSerieDetail(id) {
  return async function (dispatch) {
    try {
      var json = await axios.get("http://localhost:3001/tv/" + id);
      return dispatch({
        type: GET_SERIE_DETAIL,
        payload: json.data
      })
    } catch (error) {
      console.log(error);
    }
  }
}
export const clearSerieDetail = () => ({ type: CLEAR_SERIE_DETAIL })

// TVShowSeasonDetail Actions:
export function getSeasonDetail(id, season_number) {
  return async function (dispatch) {
    try {
      var json = await axios.get(`http://localhost:3001/season/${id}/${season_number}`);
      return dispatch({
        type: GET_SEASON_DETAIL,
        payload: json.data
      })
    } catch (error) {
      console.log(error);
    }
  }
}