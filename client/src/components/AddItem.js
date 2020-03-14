import React, { useState } from 'react'
import ImagePicker from 'react-native-image-picker'
import {
  Modal,
  View,
  Text,
  StyleSheet,
  StatusBar,
  Dimensions,
  TouchableOpacity
} from 'react-native'
import { Form } from 'native-base'
import { Input, Image } from 'react-native-elements'
import { Colors } from 'react-native/Libraries/NewAppScreen'

function AddItem ({ isVisible, closeModal }) {
  const [tags, setTags] = useState([])
  const [displayTags, setDisplayTags] = useState('')
  const [filePath, setFilePath] = useState({ data: '', uri: '' })
  const [fileData, setFileData] = useState('')
  const [fileUri, setFileUri] = useState('')
  const addTag = (e) => {
    const newTags = [...tags]
    newTags.push(e.nativeEvent.text)
    setTags(newTags)
    setDisplayTags(newTags.join(','))
  }

  const closeModalAdd = () => {
    closeModal()
    setDisplayTags('')
    setTags([])
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
      console.log('Response = ', response)

      if (response.didCancel) {
        console.log('User cancelled image picker')
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error)
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton)
        alert(response.customButton)
      } else {
        const source = { uri: response.uri }

        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };
        // alert(JSON.stringify(response));s
        console.log('response', JSON.stringify(response.data))
        setFilePath(response)
        setFileUri(response.uri)
        setFileData(response.data)
      }
    })
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
                labelStyle={styles.labelInput}
                inputStyle={{ fontSize: 15 }}
              />
              <Input
                label="Overview"
                labelStyle={styles.labelInput}
                multiline={true}
                placeholder='Overview'
                inputStyle={{ fontSize: 15 }}
              />
              <Input
                label="Popularity"
                labelStyle={styles.labelInput}
                placeholder='Popularity'
                keyboardType='numeric'
                inputStyle={{ fontSize: 15 }}
              />
              <View>
                <Input
                  label="Tags"
                  labelStyle={styles.labelInput}
                  placeholder="Tags"
                  inputStyle={{ fontSize: 15 }}
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
                  <Text style={{
                    paddingTop: 5,
                    paddingBottom: 5,
                    paddingLeft: 15,
                    paddingRight: 15,
                    color: '#E50914',
                    fontSize: 15,
                    borderRadius: 10,
                    backgroundColor: 'transparent',
                    borderColor: '#E50914',
                    borderWidth: 1
                  }}>Close</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ marginRight: 20 }}>
                  <Text style={{
                    paddingTop: 5,
                    paddingBottom: 5,
                    paddingLeft: 15,
                    paddingRight: 15,
                    color: '#fff',
                    fontSize: 15,
                    borderRadius: 10,
                    backgroundColor: '#E50914',
                    borderColor: '#E50914',
                    borderWidth: 1
                  }}>Save</Text>
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
  }
})
export default AddItem