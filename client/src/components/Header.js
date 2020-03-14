import React from 'react'
import { Header } from 'react-native-elements'

function HeaderScreen (props) {
  const title = (props.title)
  const goToHome = () => props.navigation.navigate('Home')
  return (
    <Header
      placement="left"
      centerComponent={{ text: title, style: { fontSize: 20, color: '#fff' } }}
      rightComponent={{ icon: 'home', color: '#fff', onPress: goToHome }}
      backgroundColor="#E50914"
      containerStyle={{
        justifyContent: 'space-around'
      }}
    />
  )
}

export default HeaderScreen