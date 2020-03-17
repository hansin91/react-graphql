import { movieAPI } from '../../api'
import redis from '../../redis'

export const addMovie = async (_, { input }) => {
  try {
    const { data } = await movieAPI({
      method: 'POST',
      url: '/',
      data: input,
    })
    await redis.del('movies')
    return data.newMovie
  } catch (error) {
    console.log(error)
    return error.response
  }
}

export const updateMovie = async (_, { input }) => {
  try {
    const { data } = await movieAPI({
      method: 'PUT',
      url: '/' + input.id,
      data: input
    })
    await redis.del('movies')
    const response = await movieAPI({
      method: 'GET',
      url: '/' + input.id
    })
    return response.data.movie
  } catch (error) {
    return error.response
  }
}

export const updateMovieImage = async (_, { input }) => {
  try {
    const { data } = await movieAPI({
      method: 'PATCH',
      url: '/' + input.id,
      data: input
    })
    await redis.del('movies')
    const response = await movieAPI({
      method: 'GET',
      url: '/' + input.id
    })
    return response.data.movie
  } catch (error) {
    return error.response
  }
}

export const deleteMovie = async (_, { id }) => {
  try {
    const { data } = await movieAPI({
      method: 'DELETE',
      url: '/' + id
    })
    return data
  } catch (error) {
    return error.response
  }
}