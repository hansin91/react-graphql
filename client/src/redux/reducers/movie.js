import {
  SET_ERROR_MOVIES,
  SET_LOADING_UPLOAD_IMAGE,
  SET_CREATED_FILE,
  SET_IS_ADD_MOVIE,
  SET_UPDATED_POSTER,
  SET_UPDATED_IMAGE
} from '../actions/type'

const initialState = {
  movies: [],
  error: '',
  message: '',
  isLoading: false,
  isLoadingUploadImage: null,
  createdImageFile: null,
  isAddMovie: false,
  isUpdatedPoster: false,
  updatedImageFile: ''
}

export default function reducers (state = initialState, action) {
  switch (action.type) {
    case SET_UPDATED_IMAGE:
      return {
        ...state,
        updatedImageFile: action.payload.data
      }
    case SET_IS_ADD_MOVIE:
      return {
        ...state,
        isAddMovie: action.payload
      }
    case SET_UPDATED_POSTER:
      return {
        ...state,
        isUpdatedPoster: action.payload
      }
    case SET_CREATED_FILE:
      return {
        ...state,
        createdImageFile: action.payload.data
      }
    case SET_LOADING_UPLOAD_IMAGE:
      return {
        ...state,
        isLoadingUploadImage: action.payload
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