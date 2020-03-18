import { SET_LOADING_UPLOAD_IMAGE, SET_IMAGE_FILE, SET_ERRORS } from '../actions/type'
const initialState = {
  isLoadingUploadImage: false,
  imageFile: null,
  errors: null
}

export default function reducers (state = initialState, action) {
  switch (action.type) {
    case SET_LOADING_UPLOAD_IMAGE:
      return {
        ...state,
        isLoadingUploadImage: action.payload
      }
    case SET_IMAGE_FILE:
      return {
        ...state,
        imageFile: action.payload.data
      }
    case SET_ERRORS:
      return {
        ...state,
        errors: action.payload
      }
    default:
      return state
  }
}