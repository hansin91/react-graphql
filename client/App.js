import 'react-native-gesture-handler'
import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { NavigationContainer } from '@react-navigation/native'
import Home from './src/stacks/Home'
import { Provider } from 'react-redux'
import { ApolloProvider } from '@apollo/react-hooks'
import store from './src/redux/store'
import client from './src/apollo/client'
const Drawer = createDrawerNavigator()
function App () {
  return (
    <Provider store={store}>
      <ApolloProvider client={client}>
        <NavigationContainer>
          <Drawer.Navigator initialRouteName="Home">
            <Drawer.Screen name="Home" component={Home} />
          </Drawer.Navigator>
        </NavigationContainer>
      </ApolloProvider>
    </Provider>
  )
}
export default App