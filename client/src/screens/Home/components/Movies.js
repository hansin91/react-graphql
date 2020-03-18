import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { Button } from 'react-native-elements'
import { View } from 'react-native'
import ItemList from './ItemList'
import { FETCH_MOVIES } from '../../../apollo/Query'
import CircularLoading from '../../../components/CircularLoading'
import Alert from '../../../components/Alert'

function Movies ({ navigation }) {
  const goToMovies = () => {
    navigation.navigate('Movies')
  }
  const { loading, error, data } = useQuery(FETCH_MOVIES)
  if (loading) return <CircularLoading />
  if (!loading && error) return (
    <Alert type="error" message={error} />
  )
  if (!loading && !error && data)
    return (
      <View>
        <ItemList title="Movies" data={data.getMovies.slice(0, 5)} />
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