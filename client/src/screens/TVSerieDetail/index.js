import React, { useState } from 'react'
import { ScrollView } from 'react-native'
import { Container } from 'native-base'
import { useQuery } from '@apollo/react-hooks'
import { FETCH_TV_SERIE } from '../../apollo/Query'
import CircularLoading from '../../components/CircularLoading'
import ItemDetail from '../../components/ItemDetail'
import DeleteItem from '../../components/DeleteItem'
import EditItem from '../../components/EditItem'
import Alert from '../../components/Alert'

function TVSerieDetail ({ route, navigation }) {
  const { id } = route.params
  const { type } = route.params
  const { loading, error, data } = useQuery(FETCH_TV_SERIE, {
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
  if (!loading && error) return <Alert type="error" message={error} />
  if (!loading && !error && data) return (
    <Container style={{
      backgroundColor: '#141414',
    }}>
      <DeleteItem
        type={type}
        closeModalDelete={closeModalDelete}
        object={data.getTVSerie}
        navigation={navigation}
        isVisible={isOpenDeleteModal} />
      <EditItem
        type={type}
        object={data.getTVSerie}
        closeModal={closeModal}
        isVisible={isOpen} />
      <ScrollView>
        <ItemDetail
          openModalDelete={openModalDelete}
          openModal={openModal}
          type={type} data={data.getTVSerie} />
      </ScrollView>
    </Container>
  )
}

export default TVSerieDetail