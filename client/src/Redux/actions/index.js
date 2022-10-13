import axios from "axios";
import { GET_MOVIE_DETAIL, CLEAR_MOVIE_DETAIL, GET_HOME_ALL, START_LOADING } from "./const";

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

export function getHomeAll(){
  return async function (dispatch) {
    dispatch({ type: START_LOADING});
    try {
      var json = await axios.get("http://localhost:3001/home");
      return dispatch({
        type: GET_HOME_ALL,
        payload: json.data
      })
    } catch (error) {
      console.log(error);
    }
  }
}

