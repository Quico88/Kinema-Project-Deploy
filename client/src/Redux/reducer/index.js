import { CLEAR_MOVIE_DETAIL, GET_MOVIE_DETAIL  } from "../actions/const";
const initialState = {
  movies: [],
  movieDetail: [],
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
    default: return state;
  }
  
};

export default rootReducer;
