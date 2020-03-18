import {
  SET_ERROR_MOVIES,
  SET_UPDATED_POSTER,
  SET_UPDATED_IMAGE,
  SET_IS_CREATED_FILE,
  SET_IS_ADD_MOVIE
} from './type'
import imgurAPI from '../../api/imgurAPI'
import { setLoadingUploadImage, setImageFile, setErrors } from './common'

export const setUpdatedPoster = (value) => ({
  type: SET_UPDATED_POSTER,
  payload: value
})

export const setIsAddMovie = (value) => ({
  type: SET_IS_ADD_MOVIE,
  payload: value
})

export const addNewMovie = (file) => (dispatch) => {
  dispatch(setLoadingUploadImage(true))
  dispatch(setIsAddMovie(false))
  imgurAPI({
    method: 'POST',
    data: {
      image: file.data,
      title: file.fileName
    }
  })
    .then(response => {
      dispatch(setImageFile(response.data))
      dispatch(setIsAddMovie(true))
    })
    .catch(err => {
      dispatch(setErrors(err.response))
      dispatch(setIsAddMovie(false))
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