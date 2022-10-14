
// Import actions:
import { CLEAR_MOVIE_DETAIL, GET_MOVIE_DETAIL, GET_MOVIES, GET_TV_SHOWS, GET_HOME_ALL, START_LOADING, GET_SERIE_DETAIL, CLEAR_SERIE_DETAIL, GET_SEASON_DETAIL, GET_SEARCH  } from "../actions/const";


// Initial state of global store:
const initialState = {
  carrousels_home: [],
  movies: [],
  series: [],
  search: [],
  movieDetail: [],
  serieDetail: [],
  seasonDetail: [],
  loading: false,
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
    case GET_SEARCH:
      return {
        ...state,
        search: action.payload
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
    case GET_SERIE_DETAIL:
      return {
        ...state,
        serieDetail: action.payload
      }
    case GET_SEASON_DETAIL:
      return {
        ...state,
        seasonDetail: action.payload
      }
    case GET_HOME_ALL:
      return {
        ...state,
        carrousels_home: action.payload,
        loading: false
      }
    case START_LOADING:
      return {
        ...state,
        loading: true
      }
    default: return state;
  }
};

export default rootReducer;
