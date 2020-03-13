import axios from 'axios'
import { TV_SERIE_API_URL } from './url'
const instance = axios.create({
  baseURL: TV_SERIE_API_URL
})
export default instance