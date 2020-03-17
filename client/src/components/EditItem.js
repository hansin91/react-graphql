import React, { useState, useEffect } from 'react'
import ImagePicker from 'react-native-image-picker'
import {
  Modal,
  View,
  Text,
  StyleSheet,
  StatusBar,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native'
import { Form } from 'native-base'
import { Input, Image } from 'react-native-elements'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import { useDispatch, useSelector } from 'react-redux'
import { useMutation } from '@apollo/react-hooks'
import { UPDATE_MOVIE_IMAGE } from '../apollo/Mutation'
import { FETCH_MOVIES } from '../apollo/Query'
import useInputState from '../hooks/useInputState'
import { uploadImage, setImageFile, updatePoster, setUpdatedPoster, setIsAddedMovie, setUpdatedImage } from '../redux/actions'

function EditItem ({ object, isVisible, closeModal, type, action }) {
  const dispatch = useDispatch()
  const isLoadingUploadImage = useSelector(state => state.movie.isLoadingUploadImage)
  const isUpdatedPoster = useSelector(state => state.movie.isUpdatedPoster)
  const updatedImageFile = useSelector(state => state.movie.updatedImageFile)
  const [tags, handelInputTags] = useInputState('')
  const [filePath, setFilePath] = useState('')
  const [title, handleInputTitle] = useInputState('')
  const [overview, handleInputOverview] = useInputState('')
  const [popularity, handleInputPopularity] = useInputState('')
  const [updateMovieImage,
    { loading: updateMovieImageLoading,
      error: updateMovieImageError, data: updatedMovie }] = useMutation(
        UPDATE_MOVIE_IMAGE,
        {
          update (cache, { data: { updateMovieImage } }) {
            const { getMovies } = cache.readQuery({ query: FETCH_MOVIES })
            const newMovies = getMovies.map(movie => {
              if (movie._id === updateMovieImage._id) {
                return {
                  ...movie,
                  poster_path: updateMovieImage.poster_path,
                  delete_hash: updateMovieImage.delete_hash
                }
              } else {
                return movie
              }
            })
            cache.writeQuery({
              query: FETCH_MOVIES,
              data: { getMovies: newMovies }
            })
          }
        }
      )


  useEffect(() => {
    if (updatedImageFile) {
      updateMovieImage({
        variables: {
          input: {
            id: object._id,
            poster_path: updatedImageFile.link,
            delete_hash: updatedImageFile.deletehash
          }
        }
      })
      // dispatch(setUpdatedImage(''))
    }
  }, [updatedImageFile])

  useEffect(() => {
    if (isUpdatedPoster) {
      // console.log(updatedImageFile, '==== image file ===== modal edit')
      dispatch(setUpdatedPoster(false))
    }
  }, [isUpdatedPoster])

  const closeModalAdd = () => {
    closeModal()
  }

  const renderFileData = () => {
    if (filePath) {
      return <Image
        source={{ uri: 'data:image/jpeg;base64,' + filePath.data }}
        PlaceholderContent={<ActivityIndicator />}
        style={styles.images}
      />
    } else if (object) {
      return <Image
        source={{ uri: object.poster_path }}
        PlaceholderContent={<ActivityIndicator />}
        style={styles.images}
      />
    } else {
      return <Image
        source={{ uri: 'https://placeholder.pics/svg/150x150' }}
        style={styles.images}
      />
    }
  }

  const chooseImage = () => {
    let options = {
      title: 'Select Image',
      customButtons: [
        { name: 'customOptionKey', title: 'Choose Photo from Custom Option' },
      ],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    }
    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker')
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error)
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton)
        alert(response.customButton)
      } else {
        setFilePath(response)
        console.log(action)
        console.log(object)
        dispatch(updatePoster(response, object.delete_hash))
      }
    })
  }

  const saveItem = () => {
    dispatch(uploadImage(filePath, 'add'))
  }

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}>
      <View style={{
        top: 0,
        right: 0,
        bottom: 0,
        position: 'absolute',
        left: 0,
        zIndex: 9999,
        backgroundColor: 'rgba(0,0,0,.7)',
        width: '100%',
        height: '100%',
      }}>
        <View style={{
          top: '5%',
          position: 'relative',
          left: (5 * (Dimensions.get('screen').width) / 100),
          width: '90%'
        }}>
          <View>
            <Text style={{
              backgroundColor: '#E50914',
              padding: 10,
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
              color: '#fff',
              fontWeight: 'bold'
            }}>{type === 'movie' && action === 'add' ? 'Add movie' : ''}
              {type === 'movie' && action === 'edit' ? 'Edit movie' : ''}
            </Text>
          </View>
          <View style={{ backgroundColor: '#fff' }}>
            <Form style={{ marginTop: 10 }}>
              <Input
                label="Title"
                multiline={true}
                placeholder='Title'
                onChange={handleInputTitle}
                defaultValue={object ? object.title : ''}
                labelStyle={styles.labelInput}
                inputStyle={{ fontSize: 15 }}
              />
              <Input
                label="Overview"
                labelStyle={styles.labelInput}
                multiline={true}
                placeholder='Overview'
                defaultValue={object ? object.overview : ''}
                onChange={handleInputOverview}
                inputStyle={{ fontSize: 15 }}
              />
              <Input
                label="Popularity"
                labelStyle={styles.labelInput}
                placeholder='Popularity'
                keyboardType='numeric'
                defaultValue={object ? String(object.popularity) : ''}
                onChange={handleInputPopularity}
                inputStyle={{ fontSize: 15 }}
              />
              <View>
                <Input
                  label="Tags"
                  labelStyle={styles.labelInput}
                  placeholder="Tags"
                  defaultValue={object ? object.tags.join(',') : ''}
                  onChange={handelInputTags}
                  inputStyle={{ fontSize: 15 }} />
              </View>
              <View>
                <StatusBar barStyle="dark-content" />
                <View style={styles.body}>
                  <Text style={{
                    fontSize: 15,
                    paddingTop: 10,
                    color: '#E50914',
                    fontWeight: 'bold',
                    textAlign: 'center',
                    paddingBottom: 10
                  }} >Poster</Text>
                  <View style={styles.ImageSections}>
                    <View>
                      {renderFileData()}
                      <Text style={{ textAlign: 'center' }}>Preview</Text>
                    </View>
                  </View>
                  <View style={styles.btnParentSection}>
                    <TouchableOpacity onPress={chooseImage} style={styles.btnSection}>
                      <Text style={styles.btnText}>Choose File</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              {!isLoadingUploadImage &&
                <View style={{
                  marginTop: 10,
                  marginBottom: 10,
                  flexDirection: 'row',
                  justifyContent: 'flex-end'
                }}>
                  <TouchableOpacity onPress={closeModalAdd} style={{ marginRight: 20 }}>
                    <Text style={[styles.btnFooterModal, styles.btnFooterModalClose]}>Close</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={saveItem} style={{ marginRight: 20 }}>
                    <Text style={[styles.btnFooterModal, styles.btnFooterModalSave]}>Save</Text>
                  </TouchableOpacity>
                </View>}
              {isLoadingUploadImage &&
                <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 10 }}>
                  <ActivityIndicator />
                </View>}
            </Form>
          </View>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  body: {
    backgroundColor: Colors.white,
    justifyContent: 'center',
  },
  labelInput: {
    fontSize: 15,
    color: '#E50914'
  },
  ImageSections: {
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 8,
    paddingVertical: 8,
    justifyContent: 'center'
  },
  images: {
    width: 150,
    height: 150,
  },
  btnParentSection: {
    alignItems: 'center',
    marginTop: 10
  },
  btnSection: {
    width: 225,
    height: 50,
    backgroundColor: '#DCDCDC',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3,
    marginBottom: 10
  },
  btnText: {
    textAlign: 'center',
    color: 'gray',
    fontSize: 14,
    fontWeight: 'bold'
  },
  btnFooterModal: {
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 15,
    paddingRight: 15,
    fontSize: 15,
    borderRadius: 10,
    borderWidth: 1
  },
  btnFooterModalClose: {
    color: '#E50914',
    backgroundColor: 'transparent',
    borderColor: '#E50914'
  },
  btnFooterModalSave: {
    color: '#fff',
    backgroundColor: '#E50914',
    borderColor: '#E50914'
  }
})
export default EditItem