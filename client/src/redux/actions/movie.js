import {
  SET_LOADING_MOVIES,
  SET_LOADING_UPLOAD_IMAGE,
  SET_MOVIES,
  SET_ERROR_MOVIES,
  SET_IMAGE_FILE,
  SET_UPDATED_POSTER,
  SET_IS_ADDED_MOVIE,
  SET_UPDATED_IMAGE
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

export const setImageFile = (value) => ({
  type: SET_IMAGE_FILE,
  payload: value
})

export const setUpdatedPoster = (value) => ({
  type: SET_UPDATED_POSTER,
  payload: value
})

export const setIsAddedMovie = (value) => ({
  type: SET_IS_ADDED_MOVIE,
  payload: value
})

export const uploadImage = (file, action) => (dispatch) => {
  dispatch(setLoadingUploadImage(true))
  if (action === 'edit') {
    dispatch(setUpdatedPoster(false))
  }
  if (action === 'add') {
    dispatch(setIsAddedMovie(false))
  }
  imgurAPI({
    method: 'POST',
    data: {
      image: file.data,
      title: file.fileName
    }
  })
    .then(response => {
      dispatch(setImageFile(response.data))
      if (action === 'edit') {
        dispatch(setUpdatedPoster(true))
      }
      if (action === 'add') {
        dispatch(setIsAddedMovie(true))
      }
    })
    .catch(err => {
      dispatch(setErrorMovies(err.response))
      if (action === 'edit') {
        dispatch(setUpdatedPoster(false))
      }
      if (action === 'add') {
        dispatch(setIsAddedMovie(false))
      }
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
      })
      .catch(err => {
        dispatch(setErrorMovies(err.response))
        dispatch(setLoadingUploadImage(false))
        dispatch(setUpdatedPoster(false))
      })
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