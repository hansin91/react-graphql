import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import TVSerieScreen from '../screens/TVSeries'
import TVSerieDetail from '../screens/TVSerieDetail'
const Stack = createStackNavigator()
function TVSerie () {
  return (
    <Stack.Navigator>
      <Stack.Screen name="TV Series"
        component={TVSerieScreen}
        options={{
          title: 'TV Series',
          headerStyle: {
            backgroundColor: '#E50914',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      ></Stack.Screen>
      <Stack.Screen name="Detail"
        component={TVSerieDetail}
        options={{
          title: 'Detail',
          headerStyle: {
            backgroundColor: '#E50914',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
      </Stack.Screen>
    </Stack.Navigator>
  )
}

export default TVSerie