import { useState } from 'react'
export default initialVal => {
  const [value, setValue] = useState(initialVal)
  const handleChange = e => {
    setValue(e.nativeEvent.text)
  }
  const reset = () => {
    setValue('')
  }
  return [value, handleChange, reset]
}