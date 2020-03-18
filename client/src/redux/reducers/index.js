import { combineReducers } from 'redux'
import movie from './movie'
import tvSerie from './tvserie'
import common from './common'

export default combineReducers({
  common,
  movie,
  tvSerie
})