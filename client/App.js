import 'react-native-gesture-handler'
import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import { Provider } from 'react-redux'
import { ApolloProvider } from '@apollo/react-hooks'
import Icon from 'react-native-vector-icons/Ionicons'
import store from './src/redux/store'
import client from './src/apollo/client'
import Home from './src/stacks/Home'
const Tab = createBottomTabNavigator()
function App () {
  return (
    <Provider store={store}>
      <ApolloProvider client={client}>
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                let iconName
                if (route.name === 'Home') {
                  iconName = 'ios-home'
                } else if (route.name === 'Movies') {
                  iconName = 'ios-list-box'
                }
                return <Icon name={iconName} size={size} color={focused ? '#E50914' : '#ccc'} />
              },
            })}
            tabBarOptions={{
              activeTintColor: 'tomato',
              inactiveTintColor: 'gray',
            }}
          >
            <Tab.Screen name="Home" component={Home} />
          </Tab.Navigator>
        </NavigationContainer>
      </ApolloProvider>
    </Provider>
  )
}
export default App