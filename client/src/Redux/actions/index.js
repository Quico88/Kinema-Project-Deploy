import axios from "axios";
import { GET_MOVIE_DETAIL, CLEAR_MOVIE_DETAIL, GET_MOVIES, GET_TV_SHOWS } from "./const";

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
export const clearMovieDetail = () => ({type: CLEAR_MOVIE_DETAIL })

export function getMovies(page) {
  return async function (dispatch) {
    try {
      var json = await axios.get("http://localhost:3001/home/movies/?page=" + page);
      return dispatch({
        type: GET_MOVIES,
        payload: json.data
      })
    } catch (error) {
      console.log(error);
    }
  }
}

export function getTvShows(page) {
  return async function (dispatch) {
    try {
      var json = await axios.get("http://localhost:3001/home/series/?page=" + page);
      return dispatch({
        type: GET_TV_SHOWS,
        payload: json.data
      })
    } catch (error) {
      console.log(error);
    }
  }
}