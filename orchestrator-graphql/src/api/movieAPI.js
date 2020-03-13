import axios from 'axios'
import { MOVIE_API_URL } from './url'

const instance = axios.create({
  baseURL: MOVIE_API_URL
})

export default instance