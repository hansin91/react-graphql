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

// export const updateMovie = async (_, { input }) => {
//   try {
//     const { data } = await movieAPI({
//       method: 'PUT',
//       url: '/' + input.id,
//       data: input
//     })
//     await redis.del('movies')
//     const response = await movieAPI({
//       method: 'GET',
//       url: '/' + input.id
//     })
//     return response.data.movie
//   } catch (error) {
//     return error.response
//   }
// }

// export const deleteMovie = async (_, { id }) => {
//   try {
//     const { data } = await movieAPI({
//       method: 'DELETE',
//       url: '/' + id
//     })
//     await redis.del('movies')
//     return data
//   } catch (error) {
//     return error.response
//   }
// }