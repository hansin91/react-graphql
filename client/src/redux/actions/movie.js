import {
  SET_IS_ADD_MOVIE,
  SET_IS_EDIT_MOVIE
} from './type'
import imgurAPI from '../../api/imgurAPI'
import { setLoadingUploadImage, setImageFile, setErrors } from './common'

export const setIsEditMovie = (value) => ({
  type: SET_IS_EDIT_MOVIE,
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

export const editMovie = (file, deleteHash) => dispatch => {
  dispatch(setLoadingUploadImage(true))
  dispatch(setIsEditMovie(false))
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
        dispatch(setImageFile(data))
        dispatch(setIsEditMovie(true))
      })
      .catch(err => {
        dispatch(setErrors(err.response))
        dispatch(setIsEditMovie(false))
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
        dispatch(setImageFile(data))
        dispatch(setIsEditMovie(true))
      })
      .catch(err => {
        dispatch(setErrors(err.response))
        dispatch(setIsEditMovie(false))
      })
      .finally(() => dispatch(setLoadingUploadImage(false)))
  }
}