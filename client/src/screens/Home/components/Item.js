import React from 'react'
import { Tile } from 'react-native-elements'
import { View } from 'react-native'
function Item ({ data }) {
  return (
    <View>
      <Tile
        imageSrc={{ uri: data.poster_path }}
        featured
        containerStyle={{ margin: 10 }}
        width={200}
        height={200}
      >
      </Tile>
    </View>
  )
}
export default Item