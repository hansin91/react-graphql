import React, { useState } from 'react'
import { ScrollView, View, Text } from 'react-native'
import { Container } from 'native-base'
import { useQuery } from '@apollo/react-hooks'
import { FETCH_MOVIE } from '../../apollo/Query'
import CircularLoading from '../../components/CircularLoading'
import ItemDetail from '../../components/ItemDetail'
import AddEditItem from '../../components/AddItem'
import EditItem from '../../components/EditItem'

function MovieDetail ({ route, navigation }) {
  const { id } = route.params
  const { type } = route.params
  const { loading, error, data } = useQuery(FETCH_MOVIE, {
    variables: { id }
  })
  const [isOpen, setIsOpen] = useState(false)
  const closeModal = () => {
    setIsOpen(false)
  }

  const openModal = () => {
    setIsOpen(true)
  }

  if (loading) return <CircularLoading />
  if (data && !loading && !error) {
    return (
      <Container style={{
        backgroundColor: '#141414',
      }}>
        <EditItem
          type="movie"
          action="edit"
          object={data.getMovie}
          closeModal={closeModal}
          isVisible={isOpen} />
        <ScrollView>
          <ItemDetail openModal={openModal} type={type} data={data.getMovie} />
        </ScrollView>
      </Container>
    )
  } else {
    return (
      <View>
        <Text></Text>
      </View>
    )
  }
}

export default MovieDetail