import { movieAPI, tvSerieAPI } from '../api'
import Redis from 'ioredis'

class EntertainmeController {
  static async fetchAllData (req, res, next) {
    try {
      const redis = new Redis()
      const result = await redis.get('data')
      if (result) {
        res.status(200).json({
          status: 200,
          data: JSON.parse(result)
        })
      } else {
        const movies = await movieAPI({
          method: 'GET',
          url: '/'
        })
        const tvSeries = await tvSerieAPI({
          method: 'GET',
          url: '/'
        })
        const data = {
          movies: movies.data.movies,
          tvSeries: tvSeries.data.tvSeries
        }
        redis.set('data', JSON.stringify(data))
        res.status(200).json({
          status: 200,
          data
        })
      }
    } catch (error) {
      next(error)
    }
  }
}

export default EntertainmeController