import React from 'react'
import { SliderBox } from 'react-native-image-slider-box'

const images = [
  "http://image.tmdb.org/t/p/w1280/qAhedRxRYWZAgZ8O8pHIl6QHdD7.jpg",
  "http://image.tmdb.org/t/p/w1280/4VuCtYBvZGq6Rk3gloigwlsTefE.jpg",
  "http://image.tmdb.org/t/p/w1280/5BdchxiHXO82cxm8MuXQ1Wrrsxc.jpg",
  "http://image.tmdb.org/t/p/w1280/upUy2QhMZEmtypPW3PdieKLAHxh.jpg"
]
function ImageSlider () {
  return (
    <SliderBox
      images={images}
      sliderBoxHeight={200}
      dotColor="#FFEE58"
      inactiveDotColor="#90A4AE"
      paginationBoxVerticalPadding={20}
      autoplay
      circleLoop />
  )
}
export default ImageSlider