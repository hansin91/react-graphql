import { SET_LOADING_TV_SERIES, SET_TV_SERIES, SET_ERROR_TV_SERIES } from './type'

export const setLoadingTVSeries = (value) => ({
  type: SET_LOADING_TV_SERIES,
  payload: value
})

export const setTVSeries = (tvSeries) => ({
  type: SET_TV_SERIES,
  payload: tvSeries
})

export const setErrorTVSeries = (error) => ({
  type: SET_ERROR_TV_SERIES,
  payload: error
})