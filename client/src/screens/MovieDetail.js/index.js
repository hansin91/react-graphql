import React, { useState } from 'react'
import { ScrollView, View, Text } from 'react-native'
import { Container } from 'native-base'
import { useQuery } from '@apollo/react-hooks'
import { FETCH_MOVIE } from '../../apollo/Query'
import CircularLoading from '../../components/CircularLoading'
import ItemDetail from '../../components/ItemDetail'
import DeleteItem from '../../components/DeleteItem'
import EditItem from '../../components/EditItem'

function MovieDetail ({ route, navigation }) {
  const { id } = route.params
  const { type } = route.params
  const { loading, error, data } = useQuery(FETCH_MOVIE, {
    variables: { id }
  })
  const [isOpen, setIsOpen] = useState(false)
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false)
  const closeModal = () => {
    setIsOpen(false)
  }

  const openModal = () => {
    setIsOpen(true)
  }

  const closeModalDelete = () => {
    setIsOpenDeleteModal(false)
  }

  const openModalDelete = () => {
    setIsOpenDeleteModal(true)
  }

  if (loading) return <CircularLoading />
  if (data && !loading && !error) {
    return (
      <Container style={{
        backgroundColor: '#141414',
      }}>
        <DeleteItem
          type={type}
          closeModalDelete={closeModalDelete}
          object={data.getMovie}
          isVisible={isOpenDeleteModal} />
        <EditItem
          type={type}
          action="edit"
          object={data.getMovie}
          closeModal={closeModal}
          isVisible={isOpen} />
        <ScrollView>
          <ItemDetail
            openModalDelete={openModalDelete}
            openModal={openModal}
            type={type} data={data.getMovie} />
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