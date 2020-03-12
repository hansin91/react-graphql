import axios from 'axios'
import { MOVIES_URL } from './url'

const instance = axios.create({
  baseURL: MOVIES_URL
})
export default instance