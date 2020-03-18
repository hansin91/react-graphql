import {
  SET_IS_ADD_TV_SERIE
} from '../actions/type'

const initialState = {
  isAddTVSerie: false
}

export default function reducers (state = initialState, action) {
  switch (action.type) {
    case SET_IS_ADD_TV_SERIE:
      return {
        ...state,
        isAddTVSerie: action.payload
      }
    default:
      return state
  }
}