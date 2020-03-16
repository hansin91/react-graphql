import React from 'react'
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native'
import { Image, Icon, Button } from 'react-native-elements'

function ItemDetail ({ data, type }) {
  return (
    <View style={{ marginTop: 0 }}>
      <View style={[styles.padding]}>
        <Text style={{
          fontSize: 35,
          color: '#fff',
          paddingBottom: 10,
          fontWeight: 'bold',
        }}>{data.title}</Text>
        <View style={{
          flexDirection: 'row',
          paddingBottom: 5
        }}>
          <Icon
            name='star'
            size={30}
            color='#f0c14b' />
          <Text style={{ color: '#fff', fontSize: 20, paddingLeft: 5 }}>
            {data.popularity}
          </Text>
        </View>
        <Text style={{
          fontSize: 15,
          textTransform: 'capitalize',
          paddingBottom: 15,
          color: '#fff'
        }}>{data.tags.join(', ')}</Text>
      </View>
      <Image
        source={{ uri: data.poster_path }}
        style={{ width: '100%', height: 250 }}
        PlaceholderContent={<ActivityIndicator />}
      />
      <View style={[styles.padding]}>
        <Text style={{
          fontSize: 15,
          fontWeight: 'bold',
          color: '#fff',
          paddingTop: 10,
          paddingBottom: 10
        }}>Overview</Text>
        <Text style={{
          color: '#fff',
          lineHeight: 20,
          letterSpacing: 0.5,
          textAlign: 'justify'
        }}>{data.overview}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  padding: {
    paddingLeft: 10,
    paddingRight: 10
  }
})

export default ItemDetail