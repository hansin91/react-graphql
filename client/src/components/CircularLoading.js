import React from 'react'
import { View, ActivityIndicator } from 'react-native'

function CircularLoading () {
  return (
    <View style={{
      flex: 1,
      justifyContent: 'center',
      padding: 10,
      alignItems: 'center'
    }}>
      <ActivityIndicator size="large" color="#fff" />
    </View>
  )
}

export default CircularLoading