import React, { useState } from 'react'
import ImagePicker from 'react-native-image-picker'
import {
  Modal,
  View,
  Text,
  StyleSheet,
  StatusBar,
  Dimensions,
  TouchableOpacity,
} from 'react-native'
import { Form } from 'native-base'
import { Input, Image } from 'react-native-elements'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import { useMutation } from '@apollo/react-hooks'
import { ADD_MOVIE } from '../apollo/Mutation'
import { FETCH_MOVIES } from '../apollo/Query'
import useInputState from '../hooks/useInputState'
import imgurAPI from '../api/imgurAPI'

function AddItem ({ isVisible, closeModal, type }) {
  const [tags, setTags] = useState([])
  const [displayTags, setDisplayTags] = useState('')
  const [filePath, setFilePath] = useState('')
  const [fileData, setFileData] = useState('')
  const [fileUri, setFileUri] = useState('')
  const [title, handleInputTitle, resetTitle] = useInputState('')
  const [overview, handleInputOverview, resetOverview] = useInputState('')
  const [popularity, handleInputPopularity, resetPopularity] = useInputState('')
  const [tag, handleInputTag, resetTag] = useInputState('')
  const [addMovie,
    { loading: addMovieLoading,
      error: addMovieError }] = useMutation(
        ADD_MOVIE,
        {
          update (cache, { data: { addMovie } }) {
            const { movies } = cache.readQuery({ query: FETCH_MOVIES })
            cache.writeQuery({
              query: FETCH_MOVIES,
              data: { movies: movies.concat([addMovie]) }
            })
          }
        }
      )

  const addTag = (e) => {
    resetTag()
    const newTags = [...tags]
    newTags.push(tag)
    setTags(newTags)
    setDisplayTags(newTags.join(','))
  }

  const reset = () => {
    setDisplayTags('')
    setTags([])
  }

  const closeModalAdd = () => {
    closeModal()
    reset()
  }

  const renderFileData = () => {
    if (fileData) {
      return <Image source={{ uri: 'data:image/jpeg;base64,' + fileData }}
        style={styles.images}
      />
    } else {
      return <Image source={{ uri: 'https://placeholder.pics/svg/150x150' }}
        style={styles.images}
      />
    }
  }

  const renderFileUri = () => {
    if (fileUri) {
      return <Image
        source={{ uri: fileUri }}
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
        // const source = { uri: response.uri }
        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };
        setFilePath(response)
        setFileUri(response.uri)
        setFileData(response.data)
      }
    })
  }


  const saveItem = () => {
    try {
      imgurAPI({
        method: 'POST',
        data: {
          image: fileData,
          title
        }
      })
        .then(response => {
          const newItem = {
            title,
            popularity: +popularity,
            overview,
            tags,
            poster_path: response.data.data.link,
            delete_hash: response.data.data.deletehash
          }
          if (type === 'movie') {
            addMovie({ variables: { input: newItem } })
          }
        })
        .catch(err => {
          console.log(err.response)
        })
    } catch (error) {
      console.log(error)
    }
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
            }}>Add Movie</Text>
          </View>
          <View style={{ backgroundColor: '#fff' }}>
            <Form style={{ marginTop: 10 }}>
              <Input
                label="Title"
                multiline={true}
                placeholder='Title'
                onChange={handleInputTitle}
                labelStyle={styles.labelInput}
                inputStyle={{ fontSize: 15 }}
              />
              <Input
                label="Overview"
                labelStyle={styles.labelInput}
                multiline={true}
                placeholder='Overview'
                onChange={handleInputOverview}
                inputStyle={{ fontSize: 15 }}
              />
              <Input
                label="Popularity"
                labelStyle={styles.labelInput}
                placeholder='Popularity'
                keyboardType='numeric'
                onChange={handleInputPopularity}
                inputStyle={{ fontSize: 15 }}
              />
              <View>
                <Input
                  label="Tags"
                  labelStyle={styles.labelInput}
                  placeholder="Tags"
                  onChange={handleInputTag}
                  inputStyle={{ fontSize: 15 }}
                  defaultValue={tag}
                  onSubmitEditing={addTag} />
                <Text style={{ paddingLeft: 10 }}>{displayTags}</Text>
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
              </View>
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
export default AddItem