import React from 'react'
import { Header } from 'react-native-elements'

function HeaderScreen (props) {
  const title = (props.title)
  return (
    <Header
      placement="left"
      leftComponent={{ icon: 'menu', color: '#fff' }}
      centerComponent={{ text: title, style: { fontSize: 20, color: '#fff' } }}
      rightComponent={{ icon: 'home', color: '#fff' }}
      backgroundColor="#E50914"
      containerStyle={{
        justifyContent: 'space-around'
      }}
    />
  )
}

export default HeaderScreen