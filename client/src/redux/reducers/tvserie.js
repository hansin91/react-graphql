import { SET_TV_SERIES, SET_ERROR_TV_SERIES, SET_LOADING_TV_SERIES } from '../actions/type'

const initialState = {
  tvSeries: [],
  error: '',
  message: '',
  isLoading: false
}

export default function reducers (state = initialState, action) {
  switch (action.type) {
    case SET_TV_SERIES:
      return {
        ...state,
        tvSeries: action.payload ? action.payload.getTVSeries : []
      }
    case SET_LOADING_TV_SERIES:
      return {
        ...state,
        isLoading: action.payload
      }
    case SET_ERROR_TV_SERIES:
      return {
        ...state,
        error: action.payload
      }
    default:
      return state
  }
}