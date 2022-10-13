import { CLEAR_MOVIE_DETAIL, GET_MOVIE_DETAIL, GET_HOME_ALL, START_LOADING  } from "../actions/const";
const initialState = {
  movies: [],
  movieDetail: [],
  loading: false,
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
    case GET_HOME_ALL:
      return {
        ...state,
        movies: action.payload,
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
