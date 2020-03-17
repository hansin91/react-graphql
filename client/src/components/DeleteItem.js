import React, { useEffect } from 'react'
import {
  Modal,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator
} from 'react-native'
import { useMutation } from '@apollo/react-hooks'
import { DELETE_MOVIE } from '../apollo/Mutation'
import { FETCH_MOVIES } from '../apollo/Query'

function DeleteItem ({ isVisible, object, closeModalDelete, navigation }) {
  const [deleteMovie, { loading, error, data: response }] = useMutation(DELETE_MOVIE, {
    update (cache, { data: { deleteMovie } }) {
      const { getMovies } = cache.readQuery({ query: FETCH_MOVIES })
      const newMovies = [...getMovies].filter((movie) => movie._id !== object._id)
      cache.writeQuery({
        query: FETCH_MOVIES,
        data: { getMovies: newMovies }
      })
    }
  })

  const submit = () => {
    deleteMovie({
      variables: {
        id: object._id
      }
    })
  }

  useEffect(() => {
    if (response) {
      closeModalDelete()
      navigation.navigate('Movies')
    }
  }, [response])

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
          top: '10%',
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
            }}>Delete confirmation
            </Text>
          </View>
          <View style={{
            backgroundColor: '#fff',
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10
          }}>
            <Text style={{
              padding: 10,
              fontWeight: 'bold',
              paddingBottom: 20
            }}>Are you sure want to delete this movie ?</Text>
            {!loading && <View style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
              paddingBottom: 20
            }}>
              <TouchableOpacity onPress={() => closeModalDelete()}>
                <Text style={[styles.btnModal, styles.btnModalClose]}>Close</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => submit()}>
                <Text style={[styles.btnModal, styles.btnModalSubmit]}>Delete</Text>
              </TouchableOpacity>
            </View>}
            {loading && <View style={{
              justifyContent: 'center',
              alignItems: 'center',
              paddingBottom: 20
            }}>
              <ActivityIndicator />
            </View>}
          </View>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  btnModal: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 15,
    borderRadius: 10,
    paddingRight: 15
  },
  btnModalClose: {
    backgroundColor: '#fff',
    color: '#E50914',
    marginRight: 15,
    borderWidth: 1,
    borderColor: '#E50914'
  },
  btnModalSubmit: {
    backgroundColor: '#E50914',
    color: '#fff',
    marginRight: 15,
    borderWidth: 1,
    borderColor: '#E50914'
  }
})

export default DeleteItem