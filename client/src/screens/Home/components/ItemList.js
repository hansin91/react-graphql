import React from 'react'
import { View, ScrollView } from 'react-native'
import { Text } from 'react-native-elements'
import Item from './Item'

function ItemList ({ data, title }) {
  return (
    <View style={{ marginTop: 30 }}>
      <Text style={{
        marginLeft: 10,
        fontSize: 18,
        color: '#e5e5e5',
        fontWeight: 'bold'
      }}>{title}</Text>
      <ScrollView horizontal={true} style={{ flexDirection: 'row', marginRight: 10 }}>
        {data.map((el) => <Item key={el._id} data={el} />)}
      </ScrollView>
    </View>
  )
}

export default ItemList