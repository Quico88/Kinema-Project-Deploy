import { StackItem } from "@chakra-ui/react";
import { CLEAR_MOVIE_DETAIL, GET_MOVIE_DETAIL, GET_SERIE_DETAIL, CLEAR_SERIE_DETAIL, GET_SEASON_DETAIL  } from "../actions/const";
const initialState = {
  movies: [],
  movieDetail: [],
  serieDetail: [],
  seasonDetail: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type)
  {
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
    case CLEAR_MOVIE_DETAIL:
      return {
        ...state,
        serieDetail: []
      }
    case GET_SEASON_DETAIL:
      return {
        ...state,
        seasonDetail: action.payload
      }
    default: return state;
  }
  
};

export default rootReducer;
