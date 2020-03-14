import React from 'react'
import { View, ScrollView } from 'react-native'
import { Text } from 'react-native-elements'
import Item from './Item'

function ItemList ({ movies, title }) {
  return (
    <View style={{ marginTop: 30 }}>
      <Text style={{
        marginLeft: 10,
        color: '#e5e5e5',
        fontWeight: 'bold'
      }} h4>{title}</Text>
      <ScrollView horizontal={true} style={{ flexDirection: 'row', marginRight: 10 }}>
        {movies.map((movie) => <Item key={movie._id} movie={movie} />)}
      </ScrollView>
    </View>
  )
}

export default ItemList