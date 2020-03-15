import React from 'react'
import { FlatList } from 'react-native'
import Item from './Item'

function ItemList ({ data, navigation, type }) {
  return (
    <FlatList
      data={data}
      renderItem={({ item }) => <Item type={type}
        navigation={navigation}
        key={item._id}
        data={item} />}
      keyExtractor={(item, index) => index.toString()}
    />
  )
}

export default ItemList