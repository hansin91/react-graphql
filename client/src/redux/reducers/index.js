import { combineReducers } from 'redux'
import movie from './movie'
import tvSerie from './tvserie'

export default combineReducers({
  movie,
  tvSerie
})