import { SET_LOADING_MOVIES, SET_MOVIES, SET_ERROR_MOVIES } from './type'

export const setLoadingMovies = (value) => ({
  type: SET_LOADING_MOVIES,
  payload: value
})

export const setMovies = (movies) => ({
  type: SET_MOVIES,
  payload: movies
})

export const setErrorMovies = (error) => ({
  type: SET_ERROR_MOVIES,
  payload: error
})