import {
  SET_IS_ADD_TV_SERIE,
  SET_IS_EDIT_TV_SERIE
} from './type'
import imgurAPI from '../../api/imgurAPI'
import { setLoadingUploadImage, setImageFile, setErrors } from './common'

export const setIsAddTVSerie = (value) => ({
  type: SET_IS_ADD_TV_SERIE,
  payload: value
})

export const setIsEditTVSerie = (value) => ({
  type: SET_IS_EDIT_TV_SERIE,
  payload: value
})

export const addNewTVSerie = (file) => dispatch => {
  dispatch(setLoadingUploadImage(true))
  dispatch(setIsAddTVSerie(false))
  imgurAPI({
    method: 'POST',
    data: {
      image: file.data,
      title: file.fileName
    }
  })
    .then(response => {
      dispatch(setImageFile(response.data))
      dispatch(setIsAddTVSerie(true))
    })
    .catch(err => {
      dispatch(setErrors(err.response))
      dispatch(setIsAddTVSerie(false))
    })
    .finally(() => {
      dispatch(setLoadingUploadImage(false))
    })
}

export const editTVSerie = (file, deleteHash) => dispatch => {
  dispatch(setLoadingUploadImage(true))
  dispatch(setIsEditTVSerie(false))
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
        dispatch(setIsEditTVSerie(true))
      })
      .catch(err => {
        dispatch(setErrors(err.response))
        dispatch(setIsEditTVSerie(false))
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
        dispatch(setIsEditTVSerie(true))
      })
      .catch(err => {
        dispatch(setErrors(err.response))
        dispatch(setIsEditTVSerie(false))
      })
      .finally(() => dispatch(setLoadingUploadImage(false)))
  }
}