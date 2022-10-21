import axios from 'axios';

import { useAuth } from "../../Components/AuthContext/AuthContext";
import { doc, getDoc, setDoc, Timestamp, updateDoc } from "firebase/firestore";
import { auth, firestore } from "../../Components/AuthContext/firebase.js";

// Import variables of actions:

import {
  GET_MOVIE_DETAIL,
  CLEAR_MOVIE_DETAIL,
  GET_MOVIES,
  GET_TV_SHOWS,
  GET_SEARCH,
  GET_HOME_ALL,
  START_LOADING,
  GET_SERIE_DETAIL,
  CLEAR_SERIE_DETAIL,
  GET_SEASON_DETAIL,
  CLEAR_SEARCH,
  CLEAR_MOVIES,
  CLEAR_SERIES,
  GET_ALL_GENRES,
  GET_MOVIE_GENRE_BY_ID,
  ERROR_FOUND,
  ERROR_CLEAN,
  GET_TV_SHOW_GENRES,
  GET_SERIES_BY_GENRE,
  LOG_IN,
  LOG_OUT,
  RENT_VIDEO
} from "./const";

// Actions functions
// Get movie detail:

export function getMovieDetail(id) {
  return async function (dispatch) {
    try {
      const json = await axios.get('/movies/' + id);
      if (json.status === 204) {
        return dispatch({
          type: ERROR_FOUND,
        });
      }
      return dispatch({
        type: GET_MOVIE_DETAIL,
        payload: json.data,
      });
    } catch (error) {
      return dispatch({
        type: ERROR_FOUND,
      });
    }
  };
}

export const clearMovieDetail = () => ({ type: CLEAR_MOVIE_DETAIL });

export function getHomeAll() {
  return async function (dispatch) {
    dispatch({ type: START_LOADING });
    dispatch({ type: ERROR_CLEAN });
    try {
      var json = await axios.get('/home');
      if (json.status === 204) {
        return dispatch({
          type: ERROR_FOUND,
        });
      }
      return dispatch({
        type: GET_HOME_ALL,
        payload: json.data,
      });
    } catch (error) {
      return dispatch({
        type: ERROR_FOUND,
      });
    }
  };
}

// Get movies:
export function getMovies(page) {
  return async function (dispatch) {
    try {
      const json = await axios.get(
        '/home/movies/?page=' + page
      );
      if (json.status === 204) {
        return dispatch({
          type: ERROR_FOUND,
        });
      }
      return dispatch({
        type: GET_MOVIES,
        payload: json.data,
      });
    } catch (error) {
      return dispatch({
        type: ERROR_FOUND,
      });
    }
  };
}

export function clearMovies() {
  return {
    type: CLEAR_MOVIES,
  };
}

// Get tvShows:
export function getTvShows(page) {
  return async function (dispatch) {
    try {
      const json = await axios.get('/home/series/?page=' + page);
      if (json.status === 204) {
        return dispatch({
          type: ERROR_FOUND,
        });
      }
      return dispatch({
        type: GET_TV_SHOWS,
        payload: json.data,
      });
    } catch (error) {
      return dispatch({
        type: ERROR_FOUND,
      });
    }
  };
}

export function clearTvShows() {
  return {
    type: CLEAR_SERIES,
  };
}

//searchQuery Actions:
export function getSearchByQuery(name, page) {
  return async function (dispatch) {
    try {
      const json = await axios.get('/home/search/?page=' + page + '&name=' + name);
      if (json.status === 204) {
        return dispatch({
          type: ERROR_FOUND,
        });
      }
      return dispatch({
        type: GET_SEARCH,
        payload: json.data,
      });
    } catch (error) {
      return dispatch({
        type: ERROR_FOUND,
      });
    }
  };
}

export function clearSearchByQuery() {
  return {
    type: CLEAR_SEARCH,
  };
}

// TVShowDetail Actions:
export function getSerieDetail(id) {
  return async function (dispatch) {
    try {
      var json = await axios.get('/tv/' + id);
      if (json.status === 204) {
        return dispatch({
          type: ERROR_FOUND,
        });
      }
      return dispatch({
        type: GET_SERIE_DETAIL,
        payload: json.data,
      });
    } catch (error) {
      return dispatch({
        type: ERROR_FOUND,
      });
    }
  };
}

export const clearSerieDetail = () => ({ type: CLEAR_SERIE_DETAIL });

// TVShowSeasonDetail Actions:
export function getSeasonDetail(id, season_number) {
  return async function (dispatch) {
    try {
      var json = await axios.get(`/season/${id}/${season_number}`);
      if (json.status === 204) {
        return dispatch({
          type: ERROR_FOUND,
        });
      }
      return dispatch({
        type: GET_SEASON_DETAIL,
        payload: json.data,
      });
    } catch (error) {
      return dispatch({
        type: ERROR_FOUND,
      });
    }
  };
}

export const getAllGenres = () => {
  return async function (dispatch) {
    try {
      var json = await axios.get('/home/genres/movies');
      if (json.status === 204) {
        return dispatch({
          type: ERROR_FOUND,
        });
      }
      return dispatch({
        type: GET_ALL_GENRES,
        payload: json.data,
      });
    } catch (error) {
      return dispatch({
        type: ERROR_FOUND,
      });
    }
  };
};

export default function cleanError() {
  return {
    type: ERROR_CLEAN,
  };
}

export const getMovieGenreByID = (id, page) => {
  return async function (dispatch) {
    try {
      var json = await axios.get(`/movies_by_genre?page=${page}&id=${id}`);
      if (json.status === 204) {
        return dispatch({
          type: ERROR_FOUND,
        });
      }
      return dispatch({
        type: GET_MOVIE_GENRE_BY_ID,
        payload: json.data,
      });
    } catch (error) {
      return dispatch({
        type: ERROR_FOUND,
      });
    }
  };
};



export const getTVShowGenres = () => {
  return async function (dispatch) {
    try {
      var json = await axios.get("/genres");
      if (json.status === 204) {
        return dispatch({
          type: ERROR_FOUND,
        });
      }
      return dispatch({
        type: GET_TV_SHOW_GENRES,
        payload: json.data,
      });
    } catch (error) {
      return dispatch({
        type: ERROR_FOUND,
      });
    }
  };
};


export const getSeriesByGenre = (genre, page) => {

  return async function (dispatch) {
    try {
      var json = await axios.get("/home/series_by_genre/?page=" + page + "&genre=" + genre);
      if (json.status === 204) {
        return dispatch({
          type: ERROR_FOUND,
        });
      }
      return dispatch({
        type: GET_SERIES_BY_GENRE,
        payload: json.data,
      });
    } catch (error) {
      return dispatch({
        type: ERROR_FOUND,
      });
    }
  };
};



export const loadUserData = (id) => {
  return async function (dispatch) {
    try {
      const docRef = doc(firestore, `/users/${id}`);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        let data = docSnap.data();
        data.uid = id;
        return dispatch({
          type: LOG_IN,
          payload: data
        });
      }
    } catch (error) {
      return dispatch({
        type: ERROR_FOUND,
      });
    }
  }
}

export const logOutUser = () => {
  return {
    type: LOG_OUT,
  }
};

export const rentVideo = (payload) => ({ type: RENT_VIDEO, payload });