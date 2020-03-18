import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { Button } from 'react-native-elements'
import { View } from 'react-native'
import ItemList from './ItemList'
import { FETCH_TV_SERIES } from '../../../apollo/Query'
import CircularLoading from '../../../components/CircularLoading'
import Alert from '../../../components/Alert'

function TVSeries ({ navigation }) {
  const { loading, error, data } = useQuery(FETCH_TV_SERIES)
  if (loading) return <CircularLoading />
  if (!loading && error) return <Alert type="error" message={error} />
  if (!loading && !error && data)
    return (
      <View style={{ marginBottom: 20 }}>
        <ItemList title="TV Series" data={data.getTVSeries.slice(0, 5)} />
        <Button
          containerStyle={{
            marginTop: 20,
            paddingLeft: 20,
            paddingRight: 20
          }}
          title="Load more"
          onPress={() => navigation.navigate('TV Series')}
          buttonStyle={{ backgroundColor: '#E50914', borderColor: '#E50914' }}
          titleStyle={{ color: '#fff' }}
          type="outline"
        />
      </View>
    )
}

export default TVSeries