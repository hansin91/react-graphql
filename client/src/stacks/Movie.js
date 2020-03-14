import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import MovieScreen from '../screens/Movies'
const Stack = createStackNavigator()
function Movie () {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Movies"
        component={MovieScreen}
        options={{
          title: 'Movies',
          headerStyle: {
            backgroundColor: '#E50914',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      ></Stack.Screen>
    </Stack.Navigator>
  )
}

export default Movie