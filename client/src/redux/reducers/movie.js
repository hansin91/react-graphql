import {
  SET_IS_ADD_MOVIE,
  SET_IS_EDIT_MOVIE
} from '../actions/type'

const initialState = {
  isAddMovie: false,
  isEditMovie: false
}

export default function reducers (state = initialState, action) {
  switch (action.type) {
    case SET_IS_EDIT_MOVIE:
      return {
        ...state,
        isEditMovie: action.payload
      }
    case SET_IS_ADD_MOVIE:
      return {
        ...state,
        isAddMovie: action.payload
      }
    default:
      return state
  }
}