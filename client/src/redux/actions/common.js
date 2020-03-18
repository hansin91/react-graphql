import { SET_LOADING_UPLOAD_IMAGE, SET_IMAGE_FILE, SET_ERRORS } from './type'

export const setLoadingUploadImage = (value) => ({
  type: SET_LOADING_UPLOAD_IMAGE,
  payload: value
})

export const setImageFile = (value) => ({
  type: SET_IMAGE_FILE,
  payload: value
})

export const setErrors = (value) => ({
  type: SET_ERRORS,
  payload: value
})