import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import HeaderScreen from '../components/Header'
import HomeScreen from '../screens/Home'
import Movie from '../stacks/Movie'
import TVSerie from '../stacks/TVserie'
const Stack = createStackNavigator()
function Home ({ navigation }) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}>
      <Stack.Screen name="Home"
        component={HomeScreen}
        options={{
          title: 'Entertainme',
          headerStyle: {
            backgroundColor: '#E50914',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      ></Stack.Screen>
      <Stack.Screen name="Movies"
        component={Movie}
        options={{
          header: props => <HeaderScreen
            navigation={navigation}
            title="Movies" {...props} />
        }}
      ></Stack.Screen>
      <Stack.Screen name="TV Series"
        component={TVSerie}
        options={{
          header: props => <HeaderScreen
            navigation={navigation}
            title="TV Series" {...props} />
        }}
      ></Stack.Screen>
    </Stack.Navigator>
  )
}

export default Home