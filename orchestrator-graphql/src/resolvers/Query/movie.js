import { movieAPI } from '../../api'
import redis from '../../redis'

export const getMovies = async () => {
  try {
    let movies = await redis.get('movies')
    if (movies) {
      movies = JSON.parse(movies)
    } else {
      const { data } = await movieAPI({
        method: 'GET',
        url: '/'
      })
      movies = data.movies
      await redis.set('movies', JSON.stringify(movies))
    }
    return movies
  } catch (error) {
    return error
  }
}

export const getMovie = async (_, { id }) => {
  try {
    let movies = await redis.get('movies')
    movies = JSON.parse(movies)
    let [movie] = movies.filter((movie) => movie._id === id)
    if (movie) {
      return movie
    }
    const { data } = await movieAPI({
      method: 'GET',
      params: {
        id
      }
    })
    movie = data.movie
    return movie
  } catch (error) {
    return error
  }
}