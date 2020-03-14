import React from 'react'
import { View, ActivityIndicator, ScrollView } from 'react-native'
import { Container } from 'native-base'
import { Overlay } from 'react-native-elements'
import { useDispatch, useSelector } from 'react-redux'
import { FETCH_MOVIES, FETCH_TV_SERIES } from '../apollo/query'
import { useQuery } from '@apollo/react-hooks'
import {
  setLoadingMovies,
  setMovies,
  setErrorMovies,
  setLoadingTVSeries,
  setErrorTVSeries,
  setTVSeries
} from '../redux/actions'
import ImageSlider from './components/ImageSlider'
import ItemList from './components/ItemList'

function Home () {
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
  const movies = useSelector((state) => state.movie.movies)
  if (loading) return <View><Overlay
    isVisible={loading}
    windowBackgroundColor="rgba(255, 255, 255, .5)"
    fullScreen={true}
    width="auto"
    height="auto"
  >
    <ActivityIndicator />
  </Overlay></View>

  if (movies && movies.length > 0)
    return (
      <Container style={{ backgroundColor: '#141414' }}>
        <ScrollView style={{ marginTop: 0 }}>
          <ImageSlider />
          <ItemList title="Movies" movies={movies.slice(0, 5)} />
        </ScrollView>
      </Container>
    )
}

export default Home