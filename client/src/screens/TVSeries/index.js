import React, { useState } from 'react'
import { TouchableOpacity, Text } from 'react-native'
import { Container, View } from 'native-base'
import { Icon } from 'react-native-elements'
import { useQuery } from '@apollo/react-hooks'
import { FETCH_TV_SERIES } from '../../apollo/Query'
import ItemList from '../../components/ItemList'
import AddItem from '../../components/AddItem'
import CircularLoading from '../../components/CircularLoading'
import Alert from '../../components/Alert'

function TVSerieScreen ({ navigation }) {
  const openModal = () => {
    setIsOpen(true)
  }
  const closeModal = () => {
    setIsOpen(false)
  }
  const [isOpen, setIsOpen] = useState(false)
  const { loading, error, data } = useQuery(FETCH_TV_SERIES)

  if (loading) return (
    <CircularLoading />
  )

  if (!loading && error) return (
    <Alert type="error" message={error} />
  )

  if (!loading && !error && data)
    return (
      <Container style={{ padding: 15, backgroundColor: '#141414' }}>
        <AddItem
          isVisible={isOpen}
          type="tvserie"
          action="add"
          closeModal={closeModal} />
        <TouchableOpacity style={{ marginBottom: 10 }} onPress={openModal}>
          <Icon
            name='add'
            color='#E50914'
            reverse
            size={20} />
        </TouchableOpacity>
        <ItemList type="tvserie" navigation={navigation} data={data.getTVSeries} />
      </Container>
    )
}

export default TVSerieScreen