import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useQuery } from '@apollo/react-hooks'
import { Button } from 'react-native-elements'
import ItemList from './ItemList'
import { FETCH_MOVIES } from '../../../apollo/Query'
import { setLoadingMovies, setErrorMovies, setMovies } from '../../../redux/actions'
import CircularLoading from '../../../components/CircularLoading'
import { View } from 'react-native'

function Movies ({ navigation }) {
  const dispatch = useDispatch()
  const goToMovies = () => {
    navigation.navigate('Movies')
  }
  const { loading, error, data } = useQuery(FETCH_MOVIES)
  if (loading) {
    dispatch(setLoadingMovies(loading))
  } else if (error) {
    dispatch(setErrorMovies(error))
  } else {
    dispatch(setMovies(data))
    dispatch(setLoadingMovies(loading))
  }
  const movies = useSelector((state) => state.movie.movies)

  if (loading) return <CircularLoading />
  if (movies && movies.length > 0) return (
    <View>
      <ItemList title="Movies" data={movies.slice(0, 5)} />
      <Button
        containerStyle={{
          marginTop: 20,
          paddingLeft: 20,
          paddingRight: 20
        }}
        title="Load more"
        onPress={goToMovies}
        buttonStyle={{ backgroundColor: '#E50914', borderColor: '#E50914' }}
        titleStyle={{ color: '#fff' }}
        type="outline"
      />
    </View>
  )
}

export default Movies