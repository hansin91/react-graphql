import {
  SET_IS_ADD_TV_SERIE,
  SET_IS_EDIT_TV_SERIE
} from '../actions/type'

const initialState = {
  isAddTVSerie: false,
  isEditTVSerie: false
}

export default function reducers (state = initialState, action) {
  switch (action.type) {
    case SET_IS_ADD_TV_SERIE:
      return {
        ...state,
        isAddTVSerie: action.payload
      }
    case SET_IS_EDIT_TV_SERIE:
      return {
        ...state,
        isEditTVSerie: action.payload
      }
    default:
      return state
  }
}