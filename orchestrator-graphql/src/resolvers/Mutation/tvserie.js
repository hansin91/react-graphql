import { tvSerieAPI } from '../../api'
import redis from '../../redis'

export const addTVSerie = async (_, { input }) => {
  try {
    const { data } = await tvSerieAPI({
      method: 'POST',
      url: '/',
      data: input,
    })
    await redis.del('tvSeries')
    return data.newTvSerie
  } catch (error) {
    return error.response
  }
}

export const deleteTVSerie = async (_, { id }) => {
  try {
    const { data } = await tvSerieAPI({
      method: 'DELETE',
      url: '/' + id
    })
    await redis.del('tvSeries')
    return data
  } catch (error) {
    return error.response
  }
}

export const updateTVSerie = async (_, { input }) => {
  try {
    const { data } = await tvSerieAPI({
      method: 'PUT',
      url: '/' + input.id,
      data: input
    })
    await redis.del('tvSeries')
    const response = await tvSerieAPI({
      method: 'GET',
      url: '/' + input.id
    })
    return response.data.tvSerie
  } catch (error) {
    return error.response
  }
}