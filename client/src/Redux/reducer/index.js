// Import of actions:
import { CLEAR_MOVIE_DETAIL, GET_MOVIE_DETAIL, GET_MOVIES, GET_TV_SHOWS  } from "../actions/const";

// Initial state of global store:
const initialState = {
  movies: [],
  series: [],
  movieDetail: [],
};

// Reducer:
const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_MOVIES:
      return {
        ...state,
        movies: action.payload
      }
    case GET_TV_SHOWS:
      return {
        ...state,
        series: action.payload
      }
    case GET_MOVIE_DETAIL:
      return {
        ...state,
        movieDetail: action.payload
      }
    case CLEAR_MOVIE_DETAIL:
      return {
        ...state,
        movieDetail: []
      }
    default: return state;
  }
};

export default rootReducer;
