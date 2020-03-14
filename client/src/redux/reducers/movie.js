import { SET_MOVIES, SET_ERROR_MOVIES, SET_LOADING_MOVIES } from '../actions/type'

const initialState = {
  movies: [],
  error: '',
  message: '',
  isLoading: false
}

export default function reducers (state = initialState, action) {
  switch (action.type) {
    case SET_MOVIES:
      return {
        ...state,
        movies: action.payload ? action.payload.getMovies : []
      }
    case SET_LOADING_MOVIES:
      return {
        ...state,
        isLoading: action.payload
      }
    case SET_ERROR_MOVIES:
      return {
        ...state,
        error: action.payload
      }
    default:
      return state
  }
}