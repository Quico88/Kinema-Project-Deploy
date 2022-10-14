import axios from 'axios';

// Import variables of actions:
import {
  GET_MOVIE_DETAIL,
  CLEAR_MOVIE_DETAIL,
  GET_MOVIES,
  GET_TV_SHOWS,
  GET_HOME_ALL,
  START_LOADING,
} from './const';

// Actions functions
// Get movie detail:
export function getMovieDetail(id) {
  return async function (dispatch) {
    try {
      const json = await axios.get('http://localhost:3001/movies/' + id);
      return dispatch({
        type: GET_MOVIE_DETAIL,
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export const clearMovieDetail = () => ({ type: CLEAR_MOVIE_DETAIL });

export function getHomeAll() {
  return async function (dispatch) {
    dispatch({ type: START_LOADING });
    try {
      var json = await axios.get('http://localhost:3001/home');
      return dispatch({
        type: GET_HOME_ALL,
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

// Get movies:
export function getMovies(page) {
  return async function (dispatch) {
    try {
      const json = await axios.get(
        'http://localhost:3001/home/movies/?page=' + page
      );
      return dispatch({
        type: GET_MOVIES,

        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

// Get tvShows:
export function getTvShows(page) {
  return async function (dispatch) {
    try {
      const json = await axios.get(
        'http://localhost:3001/home/series/?page=' + page
      );
      return dispatch({
        type: GET_TV_SHOWS,
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}
