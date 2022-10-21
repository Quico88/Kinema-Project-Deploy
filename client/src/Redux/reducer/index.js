// Import actions:
import {
  CLEAR_MOVIE_DETAIL,
  GET_MOVIE_DETAIL,
  GET_MOVIES,
  GET_TV_SHOWS,
  GET_HOME_ALL,
  START_LOADING,
  GET_SERIE_DETAIL,
  CLEAR_SERIE_DETAIL,
  GET_SEASON_DETAIL,
  GET_SEARCH,
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
  RENT_VIDEO,
  UPGRADE_PLAN,
} from "../actions/const";

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
  allgenres: [],
  error: false,
  user: false,
};

// Reducer:
const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_MOVIES:
      return {
        ...state,
        movies: action.payload,
      };
    case CLEAR_MOVIES:
      return {
        ...state,
        movies: [],
      };
    case GET_TV_SHOWS:
      return {
        ...state,
        series: action.payload,
      };
    case CLEAR_SERIES:
      return {
        ...state,
        series: [],
      };
    case GET_SEARCH:
      return {
        ...state,
        search: action.payload,
      };
    case CLEAR_SEARCH:
      return {
        ...state,
        search: [],
      };
    case GET_MOVIE_DETAIL:
      return {
        ...state,
        movieDetail: action.payload,
      };
    case CLEAR_MOVIE_DETAIL:
      return {
        ...state,
        movieDetail: [],
      };
    case GET_SERIE_DETAIL:
      return {
        ...state,
        serieDetail: action.payload,
      };
    case CLEAR_SERIE_DETAIL:
      return {
        ...state,
        serieDetail: [],
      };
    case GET_SEASON_DETAIL:
      return {
        ...state,
        seasonDetail: action.payload,
      };
    case GET_HOME_ALL:
      return {
        ...state,
        carrousels_home: action.payload,
        loading: false,
      };
    case START_LOADING:
      return {
        ...state,
        loading: true,
      };
    case GET_ALL_GENRES:
      return {
        ...state,
        allgenres: action.payload,
      };
    case GET_MOVIE_GENRE_BY_ID:
      return {
        ...state,
        movies: action.payload,
      };
    case ERROR_FOUND:
      return {
        ...state,
        error: true,
      };
    case ERROR_CLEAN:
      return {
        ...state,
        error: false,
      };
    case GET_TV_SHOW_GENRES:
      return {
        ...state,
        allgenres: action.payload,
      };
    case GET_SERIES_BY_GENRE:
      return {
        ...state,
        series: action.payload,
      };
    case LOG_IN:
      return {
        ...state,
        user: action.payload,
      };
    case LOG_OUT:
      return {
        ...state,
        user: false,
      }
    case RENT_VIDEO:
      return {
        ...state,
        user: {...state.user, rented: [...state.user.rented, action.payload] },
      }
    case UPGRADE_PLAN:
      return {
        ...state,
        user: {...state.user, subscription: 2 },
      }
    default:
      return state;
  }
};

export default rootReducer;
