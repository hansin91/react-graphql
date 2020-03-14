import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useQuery } from '@apollo/react-hooks'
import { Button } from 'react-native-elements'
import ItemList from './ItemList'
import { FETCH_TV_SERIES } from '../../apollo/query'
import { setLoadingTVSeries, setErrorTVSeries, setTVSeries } from '../../redux/actions'
import CircularLoading from '../../components/CircularLoading'
import { View } from 'react-native'

function TVSeries () {
  const dispatch = useDispatch()
  const { loading, error, data } = useQuery(FETCH_TV_SERIES)
  if (loading) {
    dispatch(setLoadingTVSeries(loading))
  } else if (error) {
    dispatch(setErrorTVSeries(error))
  } else {
    dispatch(setTVSeries(data))
    dispatch(setLoadingTVSeries(loading))
  }
  const tvSeries = useSelector((state) => state.tvSerie.tvSeries)

  if (loading) return <CircularLoading />
  if (tvSeries && tvSeries.length > 0) return (
    <View style={{ marginBottom: 20 }}>
      <ItemList title="TV Series" data={tvSeries.slice(0, 5)} />
      <Button
        containerStyle={{
          marginTop: 20,
          paddingLeft: 20,
          paddingRight: 20
        }}
        title="Load more"
        titleStyle={{ color: '#fff' }}
        type="outline"
      />
    </View>
  )
}

export default TVSeries