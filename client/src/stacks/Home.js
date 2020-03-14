import React from 'react'
import { View, Text } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import HomeScreen from '../screens/HomeScreen'
import HeaderScreen from '../components/Header'

const Stack = createStackNavigator()

function Home () {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home"
        component={HomeScreen}
        options={{ header: props => <HeaderScreen title="Entertainme !" {...props} /> }}
      ></Stack.Screen>
    </Stack.Navigator>
  )
}

export default Home