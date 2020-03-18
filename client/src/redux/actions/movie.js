import {
  SET_LOADING_MOVIES,
  SET_LOADING_UPLOAD_IMAGE,
  SET_MOVIES,
  SET_ERROR_MOVIES,
  SET_UPDATED_POSTER,
  SET_UPDATED_IMAGE,
  SET_IS_CREATED_FILE,
  SET_CREATED_FILE
} from './type'

import imgurAPI from '../../api/imgurAPI'

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

const setLoadingUploadImage = (value) => ({
  type: SET_LOADING_UPLOAD_IMAGE,
  payload: value
})

export const setCreatedFile = (value) => ({
  type: SET_CREATED_FILE,
  payload: value
})

export const setUpdatedPoster = (value) => ({
  type: SET_UPDATED_POSTER,
  payload: value
})

export const setIsCreatedFile = (value) => ({
  type: SET_IS_CREATED_FILE,
  payload: value
})

export const uploadImage = (file, action) => (dispatch) => {
  dispatch(setLoadingUploadImage(true))
  dispatch(setIsCreatedFile(false))
  imgurAPI({
    method: 'POST',
    data: {
      image: file.data,
      title: file.fileName
    }
  })
    .then(response => {
      dispatch(setCreatedFile(response.data))
      dispatch(setIsCreatedFile(true))
    })
    .catch(err => {
      dispatch(setErrorMovies(err.response))
      dispatch(setIsCreatedFile(false))
    })
    .finally(() => {
      dispatch(setLoadingUploadImage(false))
    })
}

export const setUpdatedImage = (value) => ({
  type: SET_UPDATED_IMAGE,
  payload: value
})

export const updatePoster = (file, deleteHash) => dispatch => {
  dispatch(setLoadingUploadImage(true))
  dispatch(setUpdatedPoster(false))
  if (deleteHash) {
    imgurAPI({
      method: 'DELETE',
      url: '/' + deleteHash
    })
      .then(({ data }) => {
        return imgurAPI({
          method: 'POST',
          data: {
            image: file.data,
            title: file.title
          }
        })
      })
      .then(({ data }) => {
        dispatch(setUpdatedImage(data))
        dispatch(setUpdatedPoster(true))
      })
      .catch(err => {
        dispatch(setErrorMovies(err.response))
        dispatch(setUpdatedPoster(false))
      })
      .finally(() => dispatch(setLoadingUploadImage(false)))
  } else {
    imgurAPI({
      method: 'POST',
      data: {
        image: file.data,
        title: file.title
      }
    })
      .then(({ data }) => {
        dispatch(setUpdatedImage(data))
        dispatch(setUpdatedPoster(true))
      })
      .catch(err => {
        dispatch(setErrorMovies(err.response))
        dispatch(setUpdatedPoster(false))
      })
      .finally(() => dispatch(setLoadingUploadImage(false)))
  }
}