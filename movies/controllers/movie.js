import Movie from '../models/Movie'

class MovieController {
  static fetchMovies (req, res, next) {
    const db = req.db
    const movieCollection = db.collection('movies')
    Movie.fetchMovies(movieCollection)
      .then(response => {
        res.status(200).json({
          status: 200,
          movies: response
        })
      })
      .catch(err => next(err))
  }

  static insertMovie (req, res, next) {
    const db = req.db
    const movieCollection = db.collection('movies')
    const { title, overview, poster_path, popularity, tags, delete_hash } = req.body
    const params = {
      title,
      overview,
      poster_path,
      popularity,
      tags,
      delete_hash
    }
    Movie.addMovie(movieCollection, params)
      .then(response => {
        res.status(201).json({
          status: 201,
          newMovie: response.ops[0],
          message: 'Insert movie successfully'
        })
      })
      .catch(err => {
        next(err)
      })
  }

  static updateMovie (req, res, next) {
    const db = req.db
    const movieCollection = db.collection('movies')
    const { title, overview, poster_path, popularity, tags } = req.body
    const { id } = req.params
    const params = {
      id,
      title,
      overview,
      poster_path,
      popularity,
      tags
    }
    Movie.updateMovie(movieCollection, params)
      .then(response => {
        const { n } = response.result
        if (n) {
          res.status(200).json({
            status: 200,
            message: 'Update movie with id ' + id + ' successfully'
          })
        } else {
          next({
            status: 404,
            name: 'NOT_FOUND',
            message: 'Movie is not found'
          })
        }
      })
      .catch(err => {
        console.log(err)
        next(err)
      })
  }

  static deleteMovie (req, res, next) {
    const db = req.db
    const movieCollection = db.collection('movies')
    Movie.deleteMovie(movieCollection, req.params.id)
      .then(response => {
        const deletedCount = response.deletedCount
        if (deletedCount) {
          res.status(200).json({
            status: 200,
            message: 'Delete movie successfully'
          })
        } else {
          next({
            status: 404,
            name: 'NOT_FOUND',
            message: 'Movie is not found'
          })
        }
      })
      .catch(err => {
        next(err)
      })
  }

  static findOne (req, res, next) {
    const db = req.db
    const id = req.params.id
    const movieCollection = db.collection('movies')
    Movie.findOne(movieCollection, id)
      .then(response => {
        res.status(200).json({
          status: 200,
          movie: response
        })
      })
      .catch(err => {
        next(err)
      })
  }
}

export default MovieController