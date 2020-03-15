import React from 'react'
import { View, Text, ActivityIndicator } from 'react-native'
import { Image } from 'react-native-elements'

function ItemDetail ({ data, type }) {
  return (
    <View style={{ marginTop: 0 }}>
      <Text style={{
        fontSize: 35,
        padding: 10,
        color: '#fff',
        fontWeight: 'bold'
      }}>{data.title}</Text>
      <Text style={{
        fontSize: 15,
        textTransform: 'capitalize',
        paddingBottom: 15,
        paddingLeft: 10,
        color: '#fff'
      }}>{data.tags.join(', ')}</Text>
      <Image
        source={{ uri: data.poster_path }}
        style={{ width: '100%', height: 250 }}
        PlaceholderContent={<ActivityIndicator />}
      />

      <View style={{ paddingLeft: 10 }}>
        <Text style={{ fontSize: 15, color: '#fff' }}>Overview</Text>
      </View>
    </View>
  )
}

export default ItemDetail