import React, { useState } from 'react'
import { TouchableOpacity, Text } from 'react-native'
import { Container, View } from 'native-base'
import { useSelector, useDispatch } from 'react-redux'
import { Icon } from 'react-native-elements'
import { useQuery } from '@apollo/react-hooks'
import { FETCH_MOVIES } from '../../apollo/Query'
import ItemList from '../../components/ItemList'
import { setLoadingMovies, setErrorMovies, setMovies } from '../../redux/actions'
import AddItem from '../../components/AddItem'

function MovieScreen ({ navigation }) {
  const movies = useSelector(state => state.movie.movies)
  const openModal = () => {
    setIsOpen(true)
  }
  const closeModal = () => {
    setIsOpen(false)
  }
  const [isOpen, setIsOpen] = useState(false)
  if (!movies.length) {
    const dispatch = useDispatch()
    const { loading, error, data } = useQuery(FETCH_MOVIES)
    if (loading) {
      dispatch(setLoadingMovies(loading))
    } else if (error) {
      dispatch(setErrorMovies(error))
    } else {
      dispatch(setMovies(data))
      dispatch(setLoadingMovies(loading))
    }
  }
  if (movies && movies.length) {
    return (
      <Container style={{ padding: 15, backgroundColor: '#141414' }}>
        <AddItem
          isVisible={isOpen}
          type="movie"
          action="add"
          closeModal={closeModal} />
        <TouchableOpacity style={{ marginBottom: 10 }} onPress={openModal}>
          <Icon
            name='add'
            color='#E50914'
            reverse
            size={20} />
        </TouchableOpacity>
        <ItemList type="movie" navigation={navigation} data={movies} />
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

export default MovieScreen