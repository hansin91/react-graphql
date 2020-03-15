import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://api.imgur.com/3/image',
  headers: {
    'Authorization': 'Client-ID 0e81df2dc44ab43',
    'Content-Type': 'application/json'
  }
})
export default instance
