import React from 'react'
import { ScrollView } from 'react-native'
import { Container } from 'native-base'
import Movies from './components/Movies'
import ImageSlider from './components/ImageSlider'
import TVSeries from './components/TVSeries'

function Home () {
  return (
    <Container style={{ backgroundColor: '#141414' }}>
      <ScrollView style={{ marginTop: 0 }}>
        <ImageSlider />
        <Movies />
        <TVSeries />
      </ScrollView>
    </Container>
  )
}

export default Home