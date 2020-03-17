import Movie from '../models/Movie'
import axios from 'axios'

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

  static updateMovieImage (req, res, next) {
    const db = req.db
    const movieCollection = db.collection('movies')
    const { poster_path, delete_hash } = req.body
    const { id } = req.params
    const params = {
      id,
      poster_path,
      delete_hash
    }
    Movie.updateMovieImage(movieCollection, params)
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

  static updateMovie (req, res, next) {
    const db = req.db
    const movieCollection = db.collection('movies')
    const { title, overview, popularity, tags } = req.body
    const { id } = req.params
    const params = {
      id,
      title,
      overview,
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
    const id = req.params.id
    try {
      Movie.findOne(movieCollection, id)
        .then(async response => {
          if (response.delete_hash) {
            await axios({
              method: 'DELETE',
              url: 'https://api.imgur.com/3/image/' + response.delete_hash,
              headers: {
                'Authorization': 'Client-ID 0e81df2dc44ab43',
                'Content-Type': 'application/json'
              }
            })
          }
          Movie.deleteMovie(movieCollection, id)
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
        })
        .catch(err => {
          next(err)
        })
    } catch (error) {
      next(error)
    }
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