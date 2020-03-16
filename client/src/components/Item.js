import React from 'react'
import { View, ActivityIndicator, Text, TouchableOpacity } from 'react-native'
import { Image, Icon } from 'react-native-elements'

function Item ({ data, type, navigation }) {

  const goToDetail = () => {
    navigation.navigate('Detail', {
      id: data._id,
      type
    })
  }

  return (
    <View style={{
      flexDirection: 'row',
      flex: 1
    }}>
      <TouchableOpacity onPress={goToDetail}>
        <Image
          source={{ uri: data.poster_path }}
          style={{ width: 200, height: 200 }}
          resizeMethod='scale'
          containerStyle={{ paddingRight: 10, paddingBottom: 30 }}
          PlaceholderContent={<ActivityIndicator />}
        />
      </TouchableOpacity>
      <View style={{ flex: 1, flexWrap: 'wrap' }}>
        <Text style={{
          color: '#fff',
          fontSize: 15,
          fontWeight: 'bold'
        }}>{data.title}</Text>
        <Text
          numberOfLines={5}
          ellipsizeMode="tail"
          style={{
            color: '#fff',
            width: '100%',
            textAlign: 'left',
            paddingTop: 5,
            paddingBottom: 5
          }}>{data.overview}</Text>
        <View style={{ flexDirection: 'row', flex: 1, paddingTop: 5 }}>
          <Icon
            name='star'
            size={20}
            color='#f0c14b' />
          <Text style={{ color: '#fff', fontSize: 16, paddingLeft: 5 }}>
            {data.popularity}
          </Text>
        </View>
        <View style={{
          flex: 1,
          flexDirection: 'row',
          flexWrap: 'wrap'
        }}>
          {data.tags.map((tag, index) => <Text style={{
            color: '#fff',
            paddingTop: 3,
            paddingBottom: 3,
            textTransform: 'capitalize',
            paddingRight: 5,
            paddingLeft: 5,
            backgroundColor: '#E50914',
            marginRight: 5,
            marginBottom: 5,
            borderRadius: 8
          }} key={index}>{tag}</Text>)}
        </View>
      </View>
    </View>
  )
}

export default Item