import { tvSerieAPI } from '../../api'
import redis from '../../redis'

export const getTVSeries = async () => {
  try {
    let tvSeries = await redis.get('tvSeries')
    if (tvSeries) {
      tvSeries = JSON.parse(tvSeries)
    } else {
      const { data } = await tvSerieAPI({
        method: 'GET',
        url: '/'
      })
      tvSeries = data.tvSeries
      await redis.set('tvSeries', JSON.stringify(tvSeries))
    }
    return tvSeries
  } catch (error) {
    return error
  }
}