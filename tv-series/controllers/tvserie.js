import TVSerie from '../models/TVSerie'

class TVSeriController {
  static fetchSerieMovies (req, res, next) {
    const db = req.db
    const tvSerieCollection = db.collection('tvSeries')
    TVSerie.fetchSerieMovies(tvSerieCollection)
      .then(response => {
        res.status(200).json({
          status: 200,
          tvSeries: response
        })
      })
      .catch(err => next(err))
  }

  static insertSerieMovie (req, res, next) {
    const db = req.db
    const tvSerieCollection = db.collection('tvSeries')
    const { title, overview, poster_path, popularity, tags, delete_hash } = req.body
    const params = {
      title,
      overview,
      poster_path,
      popularity,
      tags,
      delete_hash
    }
    TVSerie.addSerieMovie(tvSerieCollection, params)
      .then(response => {
        res.status(201).json({
          status: 201,
          newTvSerie: response.ops[0],
          message: 'Insert serie movie successfully'
        })
      })
      .catch(err => {
        next(err)
      })
  }

  static updateSerieMovie (req, res, next) {
    const db = req.db
    const tvSerieCollection = db.collection('tvSeries')
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
    TVSerie.updateSerieMovie(tvSerieCollection, params)
      .then(response => {
        const { n } = response.result
        if (n) {
          res.status(200).json({
            status: 200,
            message: 'Update serie movie with id ' + id + ' successfully'
          })
        } else {
          next({
            status: 404,
            name: 'NOT_FOUND',
            message: 'Serie movie is not found'
          })
        }
      })
      .catch(err => {
        console.log(err)
        next(err)
      })
  }

  static deleteSerieMovie (req, res, next) {
    const db = req.db
    const tvSerieCollection = db.collection('tvSeries')
    TVSerie.deleteSerieMovie(tvSerieCollection, req.params.id)
      .then(response => {
        const deletedCount = response.deletedCount
        if (deletedCount) {
          res.status(200).json({
            status: 200,
            message: 'Delete serie movie successfully'
          })
        } else {
          next({
            status: 404,
            name: 'NOT_FOUND',
            message: 'Serie movie is not found'
          })
        }
      })
      .catch(err => {
        next(err)
      })
  }

  static findOne (req, res, next) {
    const db = req.db
    const tvSerieCollection = db.collection('tvSeries')
    const id = req.params.id
    TVSerie.findOne(tvSerieCollection, id)
      .then(response => {
        res.status(200).json({
          status: 200,
          tvSeries: response
        })
      })
      .catch(err => {
        next(err)
      })
  }
}

export default TVSeriController