import axios from "axios";
import { GET_MOVIE_DETAIL, CLEAR_MOVIE_DETAIL } from "./const";

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