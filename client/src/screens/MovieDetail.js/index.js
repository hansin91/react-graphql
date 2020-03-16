import React from 'react'
import { ScrollView } from 'react-native'
import { Container } from 'native-base'
import { useQuery } from '@apollo/react-hooks'
import { FETCH_MOVIE } from '../../apollo/Query'
import CircularLoading from '../../components/CircularLoading'
import ItemDetail from '../../components/ItemDetail'

function MovieDetail ({ route, navigation }) {
  const { id } = route.params
  const { type } = route.params
  const { loading, error, data } = useQuery(FETCH_MOVIE, {
    variables: { id }
  })

  if (loading) return <CircularLoading />
  return (
    <Container style={{
      backgroundColor: '#141414',
    }}>
      <ScrollView>
        <ItemDetail type={type} data={data.getMovie} />
      </ScrollView>
    </Container>
  )
}

export default MovieDetail